import BannerSvg from 'resources/svgs/authentication/BannerSvg.svg';

export const DESC_AREA_STYLES: React.CSSProperties = {
  display: 'grid',
  gridTemplateRows: '15% 25% 50% 10%',
  gridTemplateAreas: '"." "description" "image" "."',
};

export const BANNER_CONTAINER_STYLES: React.CSSProperties = {
  margin: '0px 10%',
  gridArea: 'image',
  backgroundImage: `url(${BannerSvg})`,
  backgroundPosition: 'center',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
};

export const DESC_STYLES: React.CSSProperties = {
  gridArea: 'description',
  margin: '0px 10%',
  color: '#fff',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

export const DESC_MAIN_HEADING_STYLES: React.CSSProperties = {
  fontSize: '56px',
  fontWeight: 900,
  height: '66px',
  letterSpacing: 0,
  lineHeight: '66px',
};

export const DESC_SUB_HEADING_STYLES: React.CSSProperties = {
  height: '60px',
  color: '#FFFFFF',
  fontFamily: 'Raleway',
  fontSize: '18px',
  fontWeight: 500,
  letterSpacing: 0,
  lineHeight: '30px',
  textAlign: 'center',
  width: '70%',
};
