import config from '@config';

function Image({ className, src, alt = "Подпись по-умолчанию", width, height }) {
  const imageUrl = `${config.baseUrl}/${src}`;
  return (
      <img className={className} src={imageUrl} alt={alt} width={width} height={height} />
  );
}

export default Image;