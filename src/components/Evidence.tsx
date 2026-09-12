import { useState } from 'react';
import { Check, Clock3, MessageSquareQuote, Pencil, X } from 'lucide-react';
import type { CandidateResult, Evaluation, Fact, Task, Value } from '../domain/model';
import { displayValue } from '../domain/evaluator';
import { formatTime, instantToLocal, localToInstant } from '../domain/time';
import { Modal, ModeBadge, StatusIcon } from './Shared';
export interface FactReview {
  factId: string;
  action: 'confirm' | 'reject' | 'correct';
  value?: Value;
  reason?: string;
  supersedes?: string;
}
export function Evidence({
  candidate,
  evaluation,
  task,
  onClose,
  onReview,
  busy,
  onAcknowledge,
}: {
  candidate: CandidateResult;
  evaluation: Evaluation;
  task: Task;
  onClose: () => void;
  onReview: (review: FactReview) => void;
  busy: boolean;
  onAcknowledge?: () => void;
}) {
  const [tab, setTab] = useState<'checks' | 'transcript'>('checks'),
    [correction, setCorrection] = useState<Fact | null>(null),
    [value, setValue] = useState<Value>(''),
    [reason, setReason] = useState(''),
    [supersedes, setSupersedes] = useState<Record<string, string>>({});
  const sourceEntries = Object.entries({
    ...candidate.sources,
    [candidate.sourceId]: candidate.transcript,
  });
  function edit(f: Fact) {
    setCorrection(f);
    setValue(f.value);
    setReason('');
  }
  return (
    <Modal title="The evidence, in context" onClose={onClose} drawer>
      <div className="evidence-business">
        <span className="business-avatar">{candidate.initials}</span>
        <div>
          <h3>{candidate.name}</h3>
          <p>{candidate.category}</p>
        </div>
      </div>
      <ModeBadge mode={candidate.mode} />
      <div className={`evidence-verdict ${evaluation.verdict}`}>
        <StatusIcon verdict={evaluation.verdict} />
        <strong>{evaluation.label}</strong>
      </div>
      <p className="muted small">
        <Clock3 size={13} />
        Checked {formatTime(candidate.checkedAt, task.timeZone)} ·{' '}
        {candidate.disposition.replaceAll('_', ' ')}
      </p>
      {candidate.extractionWarnings?.length ? (
        <div className="notice" role="alert">
          <strong>Check the price interpretation</strong>
          {[...new Set(candidate.extractionWarnings)].map((message) => (
            <p key={message}>{message}</p>
          ))}
        </div>
      ) : null}
      <div className="tabs">
        <button className={tab === 'checks' ? 'active' : ''} onClick={() => setTab('checks')}>
          Requirement checks
        </button>
        <button
          className={tab === 'transcript' ? 'active' : ''}
          onClick={() => setTab('transcript')}
        >
          Source conversations
        </button>
      </div>
      {tab === 'checks' ? (
        <div className="evidence-checks">
          {evaluation.checks.map((check) => (
            <section className="evidence-check" key={check.requirement.id}>
              <div className="evidence-check-title">
                <h4>{check.requirement.label}</h4>
                <span className={`verdict-text ${check.verdict}`}>
                  <StatusIcon verdict={check.verdict} />
                  {check.verdict}
                </span>
              </div>
              <p>{check.reason}</p>
              <span className="evidence-request">
                Your requirement: {displayValue(check.requirement, task.timeZone)}
              </span>
              {(check.requirement.id === 'upfront'
                ? check.facts
                : candidate.facts.filter((f) => f.field === check.requirement.id)
              ).map((f) => {
                const replaced = candidate.facts.some((n) => n.supersedes === f.id && n.reviewed);
                const earlier = candidate.facts.filter(
                  (x) =>
                    x.field === f.field &&
                    x.id !== f.id &&
                    Date.parse(x.observedAt) <= Date.parse(f.observedAt),
                );
                return (
                  <div
                    key={f.id}
                    className={`fact-block ${replaced || f.rejected ? 'superseded' : ''}`}
                  >
                    <blockquote>
                      <MessageSquareQuote size={16} />
                      <p>“{f.raw}”</p>
                    </blockquote>
                    <div className="fact-meta">
                      <span>
                        {f.correctedBy
                          ? 'Human-corrected interpretation'
                          : f.priceBasis
                            ? f.priceBasis.replaceAll('_', ' ')
                            : 'Recipient statement'}
                      </span>
                      <span>
                        {replaced
                          ? 'Superseded'
                          : f.rejected
                            ? 'Rejected'
                            : f.reviewed
                              ? 'Reviewed'
                              : 'Awaiting your review'}
                      </span>
                    </div>
                    <p className="fact-normalized">
                      Extracted:{' '}
                      {displayValue({ ...check.requirement, value: f.value }, task.timeZone, false)}
                    </p>
                    {f.repairs?.length ? (
                      <div className="notice">
                        <strong>
                          Automatic correction · {f.reviewed ? 'reviewed' : 'needs your review'}
                        </strong>
                        {f.repairs.map((repair) => (
                          <p key={repair.rule}>
                            {repair.rule === 'explicit_usd'
                              ? `The provider interpreted this as ${displayValue({ ...check.requirement, value: repair.originalValue! }, task.timeZone, false)}. ReadyCheck corrected the amount from the recipient’s complete statement.`
                              : `The provider cited turn ${(repair.originalTurn ?? 0) + 1}. ReadyCheck found the quote in recipient turn ${f.turn + 1}.`}
                          </p>
                        ))}
                        <p>
                          Your review helps ReadyCheck choose which corrections to use next time.
                        </p>
                      </div>
                    ) : null}
                    {f.correctionReason ? (
                      <p className="fact-normalized">Correction reason: {f.correctionReason}</p>
                    ) : null}
                    <p className="fact-time">
                      Observed {formatTime(f.observedAt, task.timeZone)} · Expires{' '}
                      {formatTime(f.expiresAt, task.timeZone)}
                    </p>
                    {!replaced && !f.rejected ? (
                      <div className="fact-actions">
                        {!f.reviewed ? (
                          <>
                            <label className="supersedes-select">
                              Explicitly corrects an earlier answer?
                              <select
                                aria-label="Earlier fact superseded by this answer"
                                value={supersedes[f.id] || ''}
                                onChange={(e) =>
                                  setSupersedes((p) => ({ ...p, [f.id]: e.target.value }))
                                }
                              >
                                <option value="">No / not established</option>
                                {earlier.map((old) => (
                                  <option key={old.id} value={old.id}>
                                    {old.raw.slice(0, 75)}
                                  </option>
                                ))}
                              </select>
                            </label>
                            <button
                              className="button small-button"
                              disabled={busy}
                              onClick={() =>
                                onReview({
                                  factId: f.id,
                                  action: 'confirm',
                                  supersedes: supersedes[f.id] || undefined,
                                })
                              }
                            >
                              <Check size={14} />
                              Confirm evidence
                            </button>
                            <button
                              className="text-button danger"
                              disabled={busy}
                              onClick={() => onReview({ factId: f.id, action: 'reject' })}
                            >
                              Reject
                            </button>
                          </>
                        ) : null}
                        <button className="text-button" disabled={busy} onClick={() => edit(f)}>
                          <Pencil size={12} />
                          Correct interpretation
                        </button>
                      </div>
                    ) : null}
                  </div>
                );
              })}
              {check.facts.length === 0 ? (
                <p className="unanswered-question">Next question: {check.requirement.question}</p>
              ) : null}
            </section>
          ))}
        </div>
      ) : (
        <div className="transcripts">
          {sourceEntries.map(([id, turns], i) => (
            <section key={id}>
              <h4>{i === 0 ? 'Initial inquiry' : `Follow-up ${i}`}</h4>
              {turns.length ? (
                turns.map((turn, index) => (
                  <div className={`transcript-turn ${turn.speaker}`} key={index}>
                    <span>
                      {turn.speaker === 'caller' ? 'Assistant' : 'Recipient'} ·{' '}
                      {Math.floor(turn.offsetSeconds / 60)}:
                      {String(Math.floor(turn.offsetSeconds % 60)).padStart(2, '0')}
                    </span>
                    <p>{turn.text}</p>
                  </div>
                ))
              ) : (
                <p className="muted">
                  A transcript is unavailable or was removed under the retention policy. Unsupported
                  facts cannot pass.
                </p>
              )}
            </section>
          ))}
        </div>
      )}
      {onAcknowledge ? (
        <button className="button primary full" disabled={busy} onClick={onAcknowledge}>
          Finish reviewing this call <Check size={15} />
        </button>
      ) : null}
      {correction ? (
        <div className="correction-box">
          <div className="panel-title">
            <h4>Correct the extracted answer</h4>
            <button
              className="icon-button"
              aria-label="Cancel correction"
              onClick={() => setCorrection(null)}
            >
              <X size={17} />
            </button>
          </div>
          <p>The source wording stays unchanged. Explain how it supports your correction.</p>
          <CorrectionInput
            value={value}
            fact={correction}
            zone={task.timeZone}
            onChange={setValue}
          />
          <label>
            Reason
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={2}
              maxLength={500}
            />
          </label>
          <button
            className="button primary"
            disabled={busy || !reason.trim()}
            onClick={() => {
              onReview({ factId: correction.id, action: 'correct', value, reason });
              setCorrection(null);
            }}
          >
            Save correction
          </button>
        </div>
      ) : null}
    </Modal>
  );
}
function CorrectionInput({
  value,
  fact,
  zone,
  onChange,
}: {
  value: Value;
  fact: Fact;
  zone: string;
  onChange: (v: Value) => void;
}) {
  if (typeof value === 'boolean')
    return (
      <label>
        Confirmed answer
        <select value={String(value)} onChange={(e) => onChange(e.target.value === 'true')}>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </label>
    );
  if (typeof value === 'number')
    return (
      <label>
        {fact.unit === 'USD' ? 'Amount in dollars' : 'Amount'}
        <input
          type="number"
          min="0"
          step={fact.unit === 'USD' ? '.01' : '1'}
          value={fact.unit === 'USD' ? value / 100 : value}
          onChange={(e) =>
            onChange(Math.round(Number(e.target.value) * (fact.unit === 'USD' ? 100 : 1)))
          }
        />
      </label>
    );
  if (typeof value === 'object')
    return (
      <div>
        <label>
          Window start
          <input
            type="datetime-local"
            value={instantToLocal(value.start, zone)}
            onChange={(e) => {
              try {
                onChange({ ...value, start: localToInstant(e.target.value, zone) });
              } catch {
                /* keep valid value */
              }
            }}
          />
        </label>
        <label>
          Window end
          <input
            type="datetime-local"
            value={instantToLocal(value.end, zone)}
            onChange={(e) => {
              try {
                onChange({ ...value, end: localToInstant(e.target.value, zone) });
              } catch {
                /* keep valid value */
              }
            }}
          />
        </label>
      </div>
    );
  return (
    <label>
      Confirmed value
      <input value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}
