// Fiche de personnage - contenu
export default function FichePersonnage() {
  return (
    <div style={{ padding: '12px', fontFamily: 'MS Sans Serif, Tahoma, sans-serif', fontSize: '11px', height: '100%', overflowY: 'auto', backgroundColor: '#fff' }}>

      <div style={{ marginBottom: '16px', padding: '8px', border: '2px inset #808080', background: '#f0f0f0' }}>
        <h2 style={{ fontFamily: 'Pixelify Sans, monospace', fontSize: '18px', margin: '0 0 8px 0', color: '#000080' }}>
          ✦ ISEN HATA ✦
        </h2>
        <p style={{ margin: 0, color: '#808080', fontSize: '10px' }}>Fichier: ISEN_HATA.exe — Version 1.0</p>
      </div>

      <Section title="Identité">
        <Row label="Nom complet" value="Isen Hata" />
        <Row label="Alias" value="—" />
        <Row label="Âge" value="—" />
        <Row label="Genre" value="—" />
        <Row label="Origine" value="Academia no Shin'en" />
        <Row label="Affiliation" value="—" />
      </Section>

      <Section title="Apparence">
        <p style={{ margin: '4px 0' }}>
          [Description physique du personnage à remplir]
        </p>
      </Section>

      <Section title="Personnalité">
        <p style={{ margin: '4px 0' }}>
          [Description de la personnalité à remplir]
        </p>
      </Section>

      <Section title="Statistiques">
        <StatBar label="Force" value={70} color="#800080" />
        <StatBar label="Vitesse" value={85} color="#000080" />
        <StatBar label="Intelligence" value={90} color="#008080" />
        <StatBar label="Endurance" value={65} color="#800000" />
        <StatBar label="Maîtrise" value={80} color="#804000" />
      </Section>

      <div style={{ marginTop: '12px', padding: '6px', background: '#fffff0', border: '1px solid #c0c0c0', fontSize: '10px', color: '#808080' }}>
        <em>Ce fichier est protégé. Toute modification non autorisée est interdite.</em>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: '12px' }}>
      <div style={{
        background: 'linear-gradient(90deg, #000080, #800080)',
        color: '#fff',
        padding: '2px 8px',
        fontFamily: 'MS Sans Serif, Tahoma, sans-serif',
        fontSize: '11px',
        fontWeight: 'bold',
        marginBottom: '4px',
      }}>
        {title}
      </div>
      <div style={{ paddingLeft: '8px' }}>
        {children}
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div style={{ display: 'flex', gap: '8px', marginBottom: '2px', borderBottom: '1px dotted #dfdfdf', paddingBottom: '2px' }}>
      <span style={{ fontWeight: 'bold', minWidth: '120px', color: '#000080' }}>{label} :</span>
      <span>{value}</span>
    </div>
  );
}

function StatBar({ label, value, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
      <span style={{ minWidth: '100px', fontWeight: 'bold' }}>{label}</span>
      <div style={{ flex: 1, height: '12px', background: '#dfdfdf', border: '1px inset #808080', position: 'relative' }}>
        <div style={{ width: `${value}%`, height: '100%', background: color, imageRendering: 'pixelated' }} />
      </div>
      <span style={{ minWidth: '32px', textAlign: 'right' }}>{value}</span>
    </div>
  );
}