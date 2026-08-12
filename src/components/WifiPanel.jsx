import Icon from './Icon';

const HACK_CHARACTERS = '01<>/#$%*';

function scramble(value) {
  return Array.from(value, (character, index) =>
    /\s/.test(character)
      ? character
      : HACK_CHARACTERS[index % HACK_CHARACTERS.length],
  ).join('');
}

export default function WifiPanel({ section, guide, copyState, onCopy }) {
  const copied = copyState === 'copied';
  const displayPassword = copied
    ? scramble(guide.wifi.password)
    : guide.wifi.password;

  return (
    <div className={`wifi-card${copied ? ' is-copied' : ''}`}>
      <dl className="details-list">
        <div className="detail">
          <dt>{section.networkLabel}</dt>
          <dd>
            <span className="wifi-value">{guide.wifi.network}</span>
          </dd>
        </div>
        <div className="detail">
          <dt>{section.passwordLabel}</dt>
          <dd>
            <code
              className={`wifi-password${copied ? ' is-scrambling' : ''}`}
              data-testid="wifi-password"
              aria-label={guide.wifi.password}
            >
              {displayPassword}
            </code>
          </dd>
        </div>
      </dl>
      <button
        className="primary-button"
        type="button"
        onClick={onCopy}
        disabled={copyState === 'copying'}
      >
        <Icon name="copy" />
        {copied ? guide.copyPasswordSuccess : guide.copyPassword}
      </button>
      <p className="section-note">{section.note}</p>
    </div>
  );
}
