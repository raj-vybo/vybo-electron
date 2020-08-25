let CONFIG: ImageConfigProps = {
  qualityPercentage: 100,
  compressionPercentage: 50,
  width: 640,
  height: 480,
  resolutionChanged: false,
};

const imageConfig = {
  set: (path: any) =>
    (Object.keys(CONFIG) as Array<keyof ImageConfigProps>).forEach(
      (property) => (path[property] = CONFIG[property])
    ),
  update: (conf: Partial<ImageConfigProps>) =>
    (CONFIG = { ...CONFIG, ...conf }),
  getQuality: () => CONFIG.qualityPercentage,
  getCompression: () => CONFIG.compressionPercentage,
  getWidth: () => CONFIG.width,
  getHeight: () => CONFIG.height,
  isResolutionChanged: () => CONFIG.resolutionChanged,
  getCompressedWidth: () =>
    (
      CONFIG.width -
      CONFIG.width * (CONFIG.compressionPercentage / 100)
    ).toFixed(2),
  getCompressedHeight: () =>
    (
      CONFIG.height -
      CONFIG.height * (CONFIG.compressionPercentage / 100)
    ).toFixed(2),
  getReverseCompressScale: () =>
    (100 / CONFIG.compressionPercentage).toFixed(2),
};

const immutable = Object.freeze(imageConfig);

export default immutable;
