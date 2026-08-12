import { useEffect, useState } from 'react';
import Icon from './Icon';

export default function CheckinPhoto({ src, alt, fallback }) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => setHasError(false), [src]);

  return (
    <figure className="checkin-photo">
      {src && !hasError ? (
        <img src={src} alt={alt} onError={() => setHasError(true)} />
      ) : (
        <div className="checkin-photo__fallback">
          <Icon name="rules" />
          <span>{fallback}</span>
        </div>
      )}
    </figure>
  );
}
