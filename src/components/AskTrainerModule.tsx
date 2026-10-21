import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  MessageSquareQuote,
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Mail,
  User,
  HelpCircle,
  RefreshCw,
  X,
} from 'lucide-react';
import {
  LobConfig,
  LOBS,
  SETTINGS,
  TRAINER_CONFIG,
  LobId,
} from '../data/content';
import { getAgentProfile, saveAgentProfile } from '../utils/storage';

interface AskTrainerProps {
  currentLob?: LobConfig | null;
  onClose?: () => void;
  isModal?: boolean;
}

export const AskTrainerModule: React.FC<AskTrainerProps> = ({
  currentLob,
  onClose,
  isModal = false,
}) => {
  // Prepopulate agent info if stored
  const [agentProfile, setAgentProfile] = useState(() => getAgentProfile());

  const [requestType, setRequestType] = useState<string>(
    TRAINER_CONFIG.requestTypes[0]
  );
  const [selectedLobId, setSelectedLobId] = useState<LobId>(
    currentLob?.id || 'csr'
  );
  const [agentName, setAgentName] = useState<string>(agentProfile.name || '');
  const [agentTeam, setAgentTeam] = useState<string>(agentProfile.agentId || '');
  const [relatedModule, setRelatedModule] = useState<string>('Hot Topics');
  const [message, setMessage] = useState<string>('');

  // Validation errors
  const [errors, setErrors] = useState<{
    agentName?: string;
    message?: string;
  }>({});

  // Submission state
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState<boolean>(false);
  const [generatedMailto, setGeneratedMailto] = useState<string>('');
  const [generatedEmailBody, setGeneratedEmailBody] = useState<string>('');

  // Update selected LOB if prop changes
  useEffect(() => {
    if (currentLob) {
      setSelectedLobId(currentLob.id);
    }
  }, [currentLob]);

  const validate = (): boolean => {
    const newErrors: { agentName?: string; message?: string } = {};

    if (!agentName.trim()) {
      newErrors.agentName = 'Please enter your name.';
    }

    if (!message.trim()) {
      newErrors.message = 'Please enter your message or question.';
    } else if (message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters.';
    } else if (message.trim().length > 1000) {
      newErrors.message = 'Message cannot exceed 1,000 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    // Save profile to localStorage for convenience
    saveAgentProfile({
      name: agentName.trim(),
      agentId: agentTeam.trim(),
    });

    const activeLobName =
      LOBS.find((l) => l.id === selectedLobId)?.name || selectedLobId.toUpperCase();

    // Construct Subject: [Agent Hub] {Request type} - {LOB} - {Agent name}
    const subject = `[Agent Hub] ${requestType} - ${activeLobName} - ${agentName.trim()}`;

    // Construct Body: list every field in the form
    const body = `REQUEST DETAILS:
---------------------------------------------
Request Type: ${requestType}
Line of Business: ${activeLobName}
Agent Name: ${agentName.trim()}
Agent ID / Team: ${agentTeam.trim() || 'Not specified'}
Related Module / Topic: ${relatedModule}
Submitted: ${new Date().toLocaleString()}

AGENT MESSAGE:
---------------------------------------------
${message.trim()}

---------------------------------------------
Sent from Pomegran Account Agent Hub`;

    const mailtoUrl = `mailto:${encodeURIComponent(
      SETTINGS.trainerEmail
    )}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setGeneratedMailto(mailtoUrl);
    setGeneratedEmailBody(body);

    // Trigger mailto link
    try {
      window.location.href = mailtoUrl;
    } catch (err) {
      console.warn('Mailto link navigation note:', err);
    }

    setIsSubmitted(true);
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(generatedEmailBody);
    setCopiedToClipboard(true);
    setTimeout(() => setCopiedToClipboard(false), 3000);
  };

  const handleResetForm = () => {
    setMessage('');
    setIsSubmitted(false);
    setCopiedToClipboard(false);
  };

  const activeLobConfig = LOBS.find((l) => l.id === selectedLobId);

  return (
    <div
      className={
        isModal
          ? 'fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4'
          : 'max-w-3xl mx-auto px-4 sm:px-6 py-8'
      }
    >
      <div
        className={`bg-white rounded-2xl border border-stone-200 shadow-xl overflow-hidden w-full ${
          isModal ? 'max-w-2xl animate-in fade-in zoom-in-95 duration-150' : ''
        }`}
      >
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-[#BA3142] via-[#9E2433] to-[#801824] p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-xs">
              <MessageSquareQuote className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">
                Ask the Trainer
              </h1>
              <p className="text-xs text-rose-100">
                Direct channel to the Pomegran Account training team
              </p>
            </div>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-rose-200 hover:text-white hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-white"
              title="Close form"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Request Type */}
                <div>
                  <label
                    htmlFor="requestType"
                    className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5"
                  >
                    Request Type <span className="text-rose-600">*</span>
                  </label>
                  <select
                    id="requestType"
                    value={requestType}
                    onChange={(e) => setRequestType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 text-sm focus:border-rose-700 focus:ring-2 focus:ring-rose-700/20 focus:outline-hidden"
                  >
                    {TRAINER_CONFIG.requestTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Line of Business */}
                <div>
                  <label
                    htmlFor="lob"
                    className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5"
                  >
                    Line of Business <span className="text-rose-600">*</span>
                  </label>
                  <select
                    id="lob"
                    value={selectedLobId}
                    onChange={(e) => setSelectedLobId(e.target.value as LobId)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 text-sm focus:border-rose-700 focus:ring-2 focus:ring-rose-700/20 focus:outline-hidden"
                  >
                    {LOBS.map((l) => (
                      <option key={l.id} value={l.id}>
                        {l.name} — {l.fullName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Agent Name */}
                <div>
                  <label
                    htmlFor="agentName"
                    className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5"
                  >
                    Agent Name <span className="text-rose-600">*</span>
                  </label>
                  <input
                    id="agentName"
                    type="text"
                    value={agentName}
                    placeholder="e.g. Alex Morgan"
                    onChange={(e) => {
                      setAgentName(e.target.value);
                      if (errors.agentName) {
                        setErrors((prev) => ({ ...prev, agentName: undefined }));
                      }
                    }}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-stone-900 bg-white focus:outline-hidden ${
                      errors.agentName
                        ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                        : 'border-stone-300 focus:border-rose-700 focus:ring-2 focus:ring-rose-700/20'
                    }`}
                  />
                  {errors.agentName && (
                    <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.agentName}</span>
                    </p>
                  )}
                </div>

                {/* Agent ID or Team */}
                <div>
                  <label
                    htmlFor="agentTeam"
                    className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5"
                  >
                    Agent ID or Team <span className="text-stone-400 font-normal lowercase">(optional)</span>
                  </label>
                  <input
                    id="agentTeam"
                    type="text"
                    value={agentTeam}
                    placeholder="e.g. Team Alpha / AG-204"
                    onChange={(e) => setAgentTeam(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 text-sm focus:border-rose-700 focus:ring-2 focus:ring-rose-700/20 focus:outline-hidden"
                  >
                  </input>
                </div>
              </div>

              {/* Related Module */}
              <div>
                <label
                  htmlFor="relatedModule"
                  className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5"
                >
                  Related Module or Topic <span className="text-stone-400 font-normal lowercase">(optional)</span>
                </label>
                <select
                  id="relatedModule"
                  value={relatedModule}
                  onChange={(e) => setRelatedModule(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 text-sm focus:border-rose-700 focus:ring-2 focus:ring-rose-700/20 focus:outline-hidden"
                >
                  {TRAINER_CONFIG.modules.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="message"
                    className="block text-xs font-bold uppercase tracking-wider text-stone-700"
                  >
                    Message or Suggestion <span className="text-rose-600">*</span>
                  </label>
                  <span
                    className={`text-xs font-mono tabular-nums ${
                      message.length > 900
                        ? 'text-amber-600 font-bold'
                        : message.length < 10 && message.length > 0
                        ? 'text-rose-600'
                        : 'text-stone-400'
                    }`}
                  >
                    {message.length} / 1000 characters
                  </span>
                </div>
                <textarea
                  id="message"
                  rows={4}
                  value={message}
                  placeholder="Detail your question, describe where you need clarification, or suggest a new real-world scenario..."
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message) {
                      setErrors((prev) => ({ ...prev, message: undefined }));
                    }
                  }}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-stone-900 bg-white focus:outline-hidden ${
                    errors.message
                      ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                      : 'border-stone-300 focus:border-rose-700 focus:ring-2 focus:ring-rose-700/20'
                  }`}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              {/* Notice regarding trainer email */}
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-600 flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  Submitting generates an email addressed to{' '}
                  <strong className="text-stone-900 font-mono text-[11px]">
                    {SETTINGS.trainerEmail}
                  </strong>{' '}
                  with formatted subject <strong className="text-stone-900">[Agent Hub]</strong>.
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 flex flex-col sm:flex-row items-center justify-end gap-3">
                {onClose && (
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold text-stone-700 hover:bg-stone-100 transition-colors"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#BA3142] hover:bg-[#A32535] transition-colors shadow-xs focus-visible:ring-2 focus-visible:ring-[#BA3142] focus-visible:outline-hidden"
                >
                  <Send className="w-4 h-4" />
                  <span>Send to Trainer</span>
                </button>
              </div>
            </form>
          ) : (
            /* Confirmation State */
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-stone-950 mb-2">
                Sent to Your Trainer!
              </h2>

              <p className="text-sm text-stone-600 max-w-md mx-auto mb-6 leading-relaxed">
                Your message has been addressed to{' '}
                <strong className="text-stone-900 font-mono text-xs">{SETTINGS.trainerEmail}</strong>.
                If your default email client did not automatically launch, you can click "Open Email Client" or copy the message below.
              </p>

              {/* Copy formatted message card */}
              <div className="max-w-md mx-auto bg-stone-50 border border-stone-200 rounded-xl p-4 text-left mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                    Formatted Submission
                  </span>
                  <button
                    onClick={handleCopyMessage}
                    className="inline-flex items-center gap-1 text-xs font-bold text-rose-800 hover:text-rose-950"
                  >
                    {copiedToClipboard ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Message</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="text-[11px] font-mono text-stone-700 whitespace-pre-wrap line-clamp-6 bg-white p-3 rounded-lg border border-stone-200">
                  {generatedEmailBody}
                </pre>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                {generatedMailto && (
                  <a
                    href={generatedMailto}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-[#BA3142] hover:bg-[#A32535] transition-colors shadow-xs"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Open Email Client</span>
                  </a>
                )}

                <button
                  onClick={handleResetForm}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-300 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Send Another Question</span>
                </button>

                {onClose ? (
                  <button
                    onClick={onClose}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 rounded-xl font-bold text-xs text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-200 transition-colors shadow-xs"
                  >
                    Done
                  </button>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
