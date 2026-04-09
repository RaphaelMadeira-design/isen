import { useState, useRef, useEffect, useCallback } from 'react';
import '../styles/msn.scss';

// ─── CREDENTIALS ────────────────────────────────────────────────
const CREDENTIALS = {
  email: 'isen.hata@hotmail.fr',
  password: 'kyoto1999',
};

// ─── CONTACTS ───────────────────────────────────────────────────
const CONTACTS = [
  {
    id: 'kaito',
    name: 'Kaito_07',
    status: 'online',
    personalMessage: 'Mission en cours... →_→',
    senderColor: '#0000bb',
  },
  {
    id: 'yuki',
    name: 'YukiChan_☆',
    status: 'online',
    personalMessage: "j'ai encore eu une vision... :/",
    senderColor: '#7700cc',
  },
  {
    id: 'kagami',
    name: 'KagamiSpirit',
    status: 'away',
    personalMessage: 'Le reflet ne ment jamais.',
    senderColor: '#004488',
  },
  {
    id: 'ryo',
    name: 'Ryo',
    status: 'offline',
    personalMessage: '',
    senderColor: '#333333',
  },
];

// ─── CONVERSATIONS ──────────────────────────────────────────────
const CONVERSATIONS = {
  kaito: {
    date: "Aujourd'hui — 20:45",
    messages: [
      { from: 'Kaito_07',  text: "isen !! t'as vu les nouvelles de ce soir ?",              time: '20:45' },
      { from: 'isen.hata', text: 'non, quoi encore',                                         time: '20:46' },
      { from: 'Kaito_07',  text: 'ils ont attaqué le district nord. encore.',                time: '20:46' },
      { from: 'Kaito_07',  text: "j'ai besoin de toi sur ce coup",                           time: '20:47' },
      { from: 'isen.hata', text: 'je suis occupé',                                           time: '20:47' },
      { from: 'Kaito_07',  text: '"occupé" c\'est ça... ^^',                                 time: '20:48' },
      { from: 'Kaito_07',  text: "tu sais très bien qu'on ne peut pas le faire sans toi",    time: '20:48' },
      { from: 'isen.hata', text: 'je viendrai. mais à mes conditions.',                      time: '20:49' },
      { from: 'Kaito_07',  text: 'évidemment ^^ rendez-vous au pont de maruyama. minuit.',  time: '20:50' },
      { from: 'isen.hata', text: 'ok',                                                       time: '20:50' },
    ],
  },
  yuki: {
    date: "Aujourd'hui — 19:12",
    messages: [
      { from: 'YukiChan_☆', text: "ISEN !!! j'ai eu une vision ce matin omg",                  time: '19:12' },
      { from: 'YukiChan_☆', text: "c'était bizarre... tu étais là mais pas toi en même temps ??", time: '19:12' },
      { from: 'isen.hata',  text: 'une vision de quoi exactement',                              time: '19:14' },
      { from: 'YukiChan_☆', text: 'une silhouette derrière toi. noire. mais familière',         time: '19:15' },
      { from: 'isen.hata',  text: '...',                                                         time: '19:16' },
      { from: 'YukiChan_☆', text: "isen ?? tu vas bien ??? dis moi que c'est rien ;_;",          time: '19:17' },
      { from: 'isen.hata',  text: "c'est rien. oublie cette vision.",                           time: '19:18' },
      { from: 'YukiChan_☆', text: '... :/ tu mens très mal tu sais xD',                         time: '19:19' },
      { from: 'isen.hata',  text: 'passe une bonne nuit yuki',                                  time: '19:20' },
      { from: 'YukiChan_☆', text: 'toi aussi... fais attention à toi stp ;_;',                  time: '19:20' },
    ],
  },
  kagami: {
    date: 'Hier — 22:01',
    messages: [
      { from: 'KagamiSpirit', text: 'Le reflet ne ment jamais.',                time: '22:01' },
      { from: 'isen.hata',    text: "qu'est-ce que tu veux cette fois",          time: '22:01' },
      { from: 'KagamiSpirit', text: 'Ce que tu portes... il le sent aussi.',     time: '22:02' },
      { from: 'KagamiSpirit', text: 'Méfie-toi de ton ombre.',                   time: '22:02' },
      { from: 'isen.hata',    text: 'parle clairement pour une fois',            time: '22:03' },
      { from: 'KagamiSpirit', text: 'Bientôt. Le voile est fin cette nuit.',     time: '22:03' },
      { from: 'KagamiSpirit', text: 'Ne te retourne pas.', italic: true,         time: '22:04' },
      { from: 'system',       text: "[KagamiSpirit s'est déconnecté]",           time: '22:04' },
    ],
  },
  ryo: {
    date: 'Il y a 6 mois',
    messages: [
      { from: 'Ryo',       text: 'je dois disparaître un moment',             time: '14:23' },
      { from: 'isen.hata', text: 'quoi ? pourquoi',                           time: '14:23' },
      { from: 'Ryo',       text: 'tu comprendras plus tard.',                  time: '14:24' },
      { from: 'Ryo',       text: 'ne me cherche pas.',                        time: '14:24' },
      { from: 'isen.hata', text: "ryo. qu'est-ce qui se passe vraiment",      time: '14:25' },
      { from: 'system',    text: '[CONNEXION PERDUE]',                        time: '14:25' },
      { from: 'system',    text: "Ryo n'est plus en ligne depuis 6 mois.",   time: ''      },
    ],
  },
};

// ─── DRAG HOOK ──────────────────────────────────────────────────
function useDraggable(init) {
  const [pos, setPos] = useState(init);
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const posRef = useRef(init);

  useEffect(() => { posRef.current = pos; }, [pos]);

  const onMouseDown = useCallback((e) => {
    if (e.button !== 0) return;
    dragging.current = true;
    offset.current = {
      x: e.clientX - posRef.current.x,
      y: e.clientY - posRef.current.y,
    };
    e.preventDefault();
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      if (!dragging.current) return;
      setPos({
        x: Math.max(0, e.clientX - offset.current.x),
        y: Math.max(0, e.clientY - offset.current.y),
      });
    };
    const onUp = () => { dragging.current = false; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  return { pos, onMouseDown };
}

// ─── WIN98 WINDOW WRAPPER ────────────────────────────────────────
// IMPORTANT : position: 'absolute' (pas fixed) pour fonctionner dans le desktop
function Win98Window({ title, icon, children, onClose, zIndex = 100, initPos, style = {} }) {
  const { pos, onMouseDown } = useDraggable(initPos || { x: 150, y: 80 });

  return (
    <div
      className="win98-window"
      style={{ position: 'absolute', left: pos.x, top: pos.y, zIndex, ...style }}
      data-testid={`msn-window-${title.replace(/s/g, '-').toLowerCase()}`}
    >
      <div className="win98-titlebar" onMouseDown={onMouseDown}>
        {icon && <img src={icon} alt="" className="win98-titlebar__icon" />}
        <span className="win98-titlebar__title">{title}</span>
        <div className="win98-titlebar__btns">
          <button
            className="win98-titlebar__btn win98-titlebar__btn--close"
            onClick={onClose}
            title="Fermer"
            data-testid="msn-close-btn"
          >
            ✕
          </button>
        </div>
      </div>
      {children}
    </div>
  );
}

// ─── MSN LOGIN ──────────────────────────────────────────────────
function MSNLogin({ onLogin, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (email.trim() === CREDENTIALS.email && password === CREDENTIALS.password) {
        onLogin();
      } else {
        setError('Adresse de messagerie ou mot de passe incorrect. Vérifiez vos informations et réessayez.');
        setLoading(false);
      }
    }, 1200);
  };

  return (
    <Win98Window
      title="MSN Messenger"
      icon="https://win98icons.alexmeub.com/icons/png/msn2-1.png"
      onClose={onClose}
      zIndex={200}
      initPos={{ x: 200, y: 60 }}
      style={{ width: 340 }}
    >
      <div className="msn-header">
        <div className="msn-header__logo">🦋</div>
        <div>
          <div className="msn-header__title">MSN Messenger</div>
          <div className="msn-header__subtitle">La messagerie instantanée Windows</div>
        </div>
      </div>

      <div className="msn-login__body">
        <form onSubmit={handleSubmit}>
          <div className="msn-login__form-group">
            <label className="msn-login__label">Adresse de messagerie :</label>
            <input
              type="text"
              className="win98-input"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="utilisateur@hotmail.fr"
              autoFocus
              autoComplete="off"
              spellCheck={false}
              data-testid="msn-email-input"
            />
          </div>
          <div className="msn-login__form-group">
            <label className="msn-login__label">Mot de passe :</label>
            <input
              type="password"
              className="win98-input"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="off"
              data-testid="msn-password-input"
            />
          </div>

          {error && (
            <div className="msn-login__error" data-testid="msn-login-error">
              ⚠ {error}
            </div>
          )}

          <div className="msn-login__checkbox-row">
            <input type="checkbox" id="msn-remember" />
            <label htmlFor="msn-remember">Mémoriser mon mot de passe</label>
          </div>

          <div className="msn-login__actions">
            <button
              type="submit"
              className="win98-btn"
              disabled={loading}
              data-testid="msn-login-btn"
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
            <button type="button" className="win98-btn" onClick={onClose}>
              Annuler
            </button>
          </div>
        </form>

        <div className="msn-login__footer">
          <a href="https://www.passport.com" target="_blank" rel="noreferrer">
            Obtenir un compte Passport gratuit...
          </a>
        </div>
      </div>

      <div className="msn-login__copyright">
        © 1999 Microsoft Corporation. Tous droits réservés.
      </div>
    </Win98Window>
  );
}

// ─── MSN CONTACT LIST ────────────────────────────────────────────
function MSNContactList({ onOpenChat, onClose }) {
  const [expanded, setExpanded] = useState({ online: true, offline: true });

  const online = CONTACTS.filter(c => c.status === 'online' || c.status === 'away');
  const offline = CONTACTS.filter(c => c.status === 'offline');

  const toggle = (group) => setExpanded(p => ({ ...p, [group]: !p[group] }));

  return (
    <Win98Window
      title="MSN Messenger"
      icon="https://win98icons.alexmeub.com/icons/png/msn2-1.png"
      onClose={onClose}
      zIndex={150}
      initPos={{ x: 90, y: 70 }}
      style={{ width: 260 }}
    >
      <div className="msn-contacts__user-bar">
        <span className="msn-dot msn-dot--online" />
        <div>
          <div className="msn-contacts__user-name">isen.hata</div>
          <div className="msn-contacts__user-status">En ligne</div>
        </div>
      </div>

      <div className="msn-contacts__body" data-testid="msn-contacts-list">
        <div
          className="msn-group-header"
          onClick={() => toggle('online')}
          data-testid="msn-group-online"
        >
          <span className="msn-group-header__arrow">
            {expanded.online ? '▼' : '▶'}
          </span>
          <span>En ligne ({online.length})</span>
        </div>
        {expanded.online && online.map(contact => (
          <ContactItem
            key={contact.id}
            contact={contact}
            onDoubleClick={() => onOpenChat(contact.id)}
          />
        ))}

        <div
          className="msn-group-header"
          onClick={() => toggle('offline')}
          data-testid="msn-group-offline"
        >
          <span className="msn-group-header__arrow">
            {expanded.offline ? '▼' : '▶'}
          </span>
          <span>Hors ligne ({offline.length})</span>
        </div>
        {expanded.offline && offline.map(contact => (
          <ContactItem
            key={contact.id}
            contact={contact}
            onDoubleClick={() => onOpenChat(contact.id)}
          />
        ))}
      </div>

      <div className="msn-contacts__toolbar">
        <button className="win98-btn msn-toolbar-btn">Contacts</button>
        <button className="win98-btn msn-toolbar-btn">Outils</button>
        <button className="win98-btn msn-toolbar-btn">Aide</button>
      </div>
    </Win98Window>
  );
}

function ContactItem({ contact, onDoubleClick }) {
  return (
    <div
      className={`msn-contact-item ${contact.status === 'offline' ? 'msn-contact-item--offline' : ''}`}
      onDoubleClick={onDoubleClick}
      title="Double-cliquez pour ouvrir la conversation"
      data-testid={`msn-contact-${contact.id}`}
    >
      <span className={`msn-dot msn-dot--${contact.status}`} />
      <div>
        <div className="msn-contact-item__name">{contact.name}</div>
        {contact.personalMessage && (
          <div className="msn-contact-item__msg">{contact.personalMessage}</div>
        )}
      </div>
    </div>
  );
}

// ─── MSN CHAT WINDOW ─────────────────────────────────────────────
function MSNChat({ contact, index, onClose }) {
  const chatRef = useRef(null);
  const conv = CONVERSATIONS[contact.id];

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, []);

  const initX = 370 + index * 30;
  const initY = 70 + index * 20;

  return (
    <Win98Window
      title={`Conversation avec ${contact.name}`}
      icon="https://win98icons.alexmeub.com/icons/png/msn2-1.png"
      onClose={onClose}
      zIndex={200 + index}
      initPos={{ x: initX, y: initY }}
      style={{ width: 390 }}
    >
      <div className="msn-chat__contact-bar">
        <span className={`msn-dot msn-dot--${contact.status}`} />
        <div>
          <div className="msn-chat__contact-name">{contact.name}</div>
          <div className="msn-chat__contact-status">
            {contact.personalMessage || (contact.status === 'offline' ? 'Hors ligne' : 'En ligne')}
          </div>
        </div>
      </div>

      <div className="msn-chat__messages" ref={chatRef} data-testid={`msn-chat-messages-${contact.id}`}>
        {conv.date && (
          <div className="msn-chat__separator">{conv.date}</div>
        )}
        {conv.messages.map((msg, i) => {
          const isSystem = msg.from === 'system';
          const isSelf = msg.from === 'isen.hata';

          if (isSystem) {
            return (
              <div key={i} className="msn-msg">
                <span className="msn-msg__text msn-msg__text--system">{msg.text}</span>
              </div>
            );
          }

          return (
            <div key={i} className="msn-msg">
              <div className="msn-msg__header">
                <span
                  className={`msn-msg__sender ${isSelf ? 'msn-msg__sender--self' : 'msn-msg__sender--other'}`}
                  style={!isSelf ? { color: contact.senderColor } : {}}
                >
                  {msg.from} dit :
                </span>
                {msg.time && <span className="msn-msg__time">({msg.time})</span>}
              </div>
              <div className={`msn-msg__text ${msg.italic ? 'msn-msg__text--italic' : ''}`}>
                {msg.text}
              </div>
            </div>
          );
        })}
      </div>

      <div className="msn-chat__input-area">
        <div className="msn-chat__input-label">isen.hata dit :</div>
        <textarea
          className="msn-chat__textarea"
          placeholder="Tapez votre message ici..."
          data-testid={`msn-chat-input-${contact.id}`}
          disabled={contact.status === 'offline'}
        />
        <div className="msn-chat__actions">
          <button
            className="win98-btn msn-chat__action-btn"
            disabled={contact.status === 'offline'}
            title={contact.status === 'offline' ? 'Ce contact est hors ligne' : ''}
          >
            Envoyer
          </button>
          <button className="win98-btn msn-chat__action-btn">Bloquer</button>
        </div>
      </div>
    </Win98Window>
  );
}

// ─── MAIN MSN APP ────────────────────────────────────────────────
export default function MSNApp({ onClose }) {
  const [phase, setPhase] = useState('login'); // 'login' | 'contacts'
  const [openChats, setOpenChats] = useState([]);

  const openChat = (contactId) => {
    if (!openChats.includes(contactId)) {
      setOpenChats(prev => [...prev, contactId]);
    }
  };

  const closeChat = (contactId) => {
    setOpenChats(prev => prev.filter(id => id !== contactId));
  };

  return (
    <>
      {phase === 'login' ? (
        <MSNLogin
          onLogin={() => setPhase('contacts')}
          onClose={onClose}
        />
      ) : (
        <MSNContactList
          onOpenChat={openChat}
          onClose={onClose}
        />
      )}

      {openChats.map((contactId, i) => {
        const contact = CONTACTS.find(c => c.id === contactId);
        return (
          <MSNChat
            key={contactId}
            contact={contact}
            index={i}
            onClose={() => closeChat(contactId)}
          />
        );
      })}
    </>
  );
}