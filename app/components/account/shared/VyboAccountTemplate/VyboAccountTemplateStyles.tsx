export const MAIN_STYLES: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '32% 68%',
  backgroundColor: '#1E222D',
  height: '100vh',
};

export const LEFT_PANEL_STYLES: React.CSSProperties = {
  borderRadius: '0 44px 44px 0',
  backgroundColor: '#2A303E',
  boxShadow: '0 2px 4px 0 rgba(0,0,0,0.24)',
  display: 'grid',
  gridTemplateRows: '20% 60% 20%',
  gridTemplateColumns: '1fr',
  gridTemplateAreas: '"topArea" "workingArea" "bottomArea"',
};

export const TOP_AREA_STYLES: React.CSSProperties = {
  gridArea: 'topArea',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
};

export const BOTTOM_AREA_STYLES: React.CSSProperties = {
  gridArea: 'bottomArea',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
};

export const WORKING_AREA_STYLES: React.CSSProperties = {
  gridArea: 'workingArea',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

export const MAIN_HEADING_TEXT_STYLES: React.CSSProperties = {
  color: '#B3B6BF',
  fontFamily: 'Raleway',
  fontSize: '16px',
  fontWeight: 600,
  letterSpacing: 0,
  lineHeight: '19px',
  textAlign: 'center',
  marginBottom: '12px',
};

export const SUB_HEADING_TEXT_STYLES: React.CSSProperties = {
  width: '65%',
  color: '#B3B6BF',
  fontFamily: 'Raleway',
  fontSize: '14px',
  letterSpacing: 0,
  lineHeight: '18px',
  textAlign: 'center',
  marginBottom: '12px',
};
