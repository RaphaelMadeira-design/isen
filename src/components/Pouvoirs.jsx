// Pouvoir et Techniques - contenu
export default function Pouvoirs() {
  return (
    <div style={{ padding: '12px', fontFamily: 'MS Sans Serif, Tahoma, sans-serif', fontSize: '11px', height: '100%', overflowY: 'auto', backgroundColor: '#fff' }}>

      <div style={{ marginBottom: '16px', padding: '8px', border: '2px inset #808080', background: '#f0f0f0' }}>
        <h2 style={{ fontFamily: 'Pixelify Sans, monospace', fontSize: '18px', margin: '0 0 8px 0', color: '#800080' }}>
          ⚡ POUVOIRS & TECHNIQUES ⚡
        </h2>
        <p style={{ margin: 0, color: '#808080', fontSize: '10px' }}>Fichier: POUVOIRS.exe — Classifié</p>
      </div>

      <Section title="Capacités innées">
        <SkillCard
          name="[Pouvoir 1]"
          type="Actif"
          level="S"
          desc="Description du pouvoir à remplir."
          color="#800080"
        />
        <SkillCard
          name="[Pouvoir 2]"
          type="Passif"
          level="A"
          desc="Description du pouvoir à remplir."
          color="#000080"
        />
      </Section>

      <Section title="Techniques combatives">
        <SkillCard
          name="[Technique 1]"
          type="Attaque"
          level="S+"
          desc="Description de la technique à remplir."
          color="#800000"
        />
        <SkillCard
          name="[Technique 2]"
          type="Défense"
          level="A+"
          desc="Description de la technique à remplir."
          color="#004080"
        />
        <SkillCard
          name="[Technique 3]"
          type="Spécial"
          level="SS"
          desc="Description de la technique à remplir."
          color="#400080"
        />
      </Section>

      <Section title="Formes / Transformations">
        <SkillCard
          name="[Forme 1]"
          type="Transformation"
          level="EX"
          desc="Description de la forme à remplir."
          color="#008040"
        />
      </Section>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <div style={{
        background: 'linear-gradient(90deg, #800080, #ff00ff)',
        color: '#fff',
        padding: '2px 8px',
        fontFamily: 'MS Sans Serif, Tahoma, sans-serif',
        fontSize: '11px',
        fontWeight: 'bold',
        marginBottom: '8px',
      }}>
        {title}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '4px' }}>
        {children}
      </div>
    </div>
  )
}

function SkillCard({ name, type, level, desc, color }) {
  const levelColors = { 'EX': '#ff0000', 'SS': '#ff4400', 'S+': '#ff8800', 'S': '#cc8800', 'A+': '#0000cc', 'A': '#000080' }
  const lColor = levelColors[level] || '#000'

  return (
    <div style={{
      border: '2px outset #c0c0c0',
      padding: '6px 8px',
      background: '#f8f8f8',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
        <div style={{
          width: '24px', height: '16px',
          background: lColor,
          color: '#fff',
          fontSize: '9px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          {level}
        </div>
        <span style={{ fontWeight: 'bold', color, fontSize: '12px' }}>{name}</span>
        <span style={{
          marginLeft: 'auto',
          fontSize: '9px',
          padding: '1px 4px',
          border: `1px solid ${color}`,
          color,
        }}>
          {type}
        </span>
      </div>
      <p style={{ margin: 0, fontSize: '10px', color: '#404040', paddingLeft: '32px' }}>{desc}</p>
    </div>
  )
}