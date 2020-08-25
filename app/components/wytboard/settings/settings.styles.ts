export const VYBO_POPUP_HEADER_STYLES: React.CSSProperties = {
  fontSize: '18px',
  fontWeight: 600,
  letterSpacing: 0,
  lineHeight: '21px',
  textAlign: 'center',
  padding: '24px 0px',
  margin: 0,
  borderBottom: '1px solid #242936',
};

export const VYBO_POPUP_BODY_STYLES: React.CSSProperties = {
  backgroundColor: '#2A303E',
  color: '#fff',
  borderRadius: '12px',
  padding: 0,
  width: '710px',
};

export const SETTING_POPUP_MAIN_WRAPPER_STYLES: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '225px auto',
  gridTemplateAreas: '"sideBar settingsArea"',
  height: '500px',
};

export const SETTINGS_POPUP_SIDEBAR_STYLES: React.CSSProperties = {
  gridArea: 'sideBar',
  padding: '24px',
  borderRight: '1px solid #242936',
};

export const SETTINGS_POPUP_WORKING_AREA_STYLES: React.CSSProperties = {
  gridArea: 'settingsArea',
  padding: '24px',
  fontWeight: 400,
  fontSize: '14px',
};
