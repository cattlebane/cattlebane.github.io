import { useState, useCallback, useContext, useEffect, useRef } from 'react';
import GlobalControlsContext from '../../../store/globalcontrols-context';
import gsap from 'gsap';

const Preview = (props) => {
  const { id, url, size, type } = props;
  const globalControlsCtx = useContext(GlobalControlsContext);
  const [zoomLevel, setZoomLevel] = useState(100);

  const iFrameRef = useRef(null);
  const videoRef = useRef(null);

  const onPreviewRefresh = useCallback(async () => {
    if (iFrameRef.current) {
      console.log('Preview onPreviewRefresh', id, iFrameRef.current.src);
      iFrameRef.current.src = iFrameRef.current.src;

      // ** force resize on HTML units to refresh
      setTimeout(() => {
        const iframeDoc =
          iFrameRef.current.contentDocument ||
          iFrameRef.current.contentWindow.document;
        gsap.set(iframeDoc.body, {
          transformOrigin: 'top left',
          scale: globalControlsCtx.zoomLevel / 100,
        });
      }, 1000);
    } else if (videoRef.current) {
      videoRef.current.currentTime = 0;
      if (videoRef.current.paused) {
        videoRef.current.play();
      }
    }
  }, [id]);

  useEffect(() => {
    if (globalControlsCtx.toRefresh.indexOf(id) > -1) {
      onPreviewRefresh();
    }
  }, [id, globalControlsCtx.toRefresh, onPreviewRefresh]);

  useEffect(() => {
    if (globalControlsCtx.zoomLevel === zoomLevel) {
      return;
    }
    setZoomLevel(globalControlsCtx.zoomLevel);

    // ** iframe stuff
    if (iFrameRef.current) {
      const iframeDoc =
        iFrameRef.current.contentDocument ||
        iFrameRef.current.contentWindow.document;
      gsap.set(iframeDoc.body, {
        transformOrigin: 'top left',
        scale: globalControlsCtx.zoomLevel / 100,
      });
    }
  }, [globalControlsCtx.zoomLevel]);

  return (
    <>
      <li className="centered">
        {type.indexOf('image') > -1 ? (
          <div
            className="preview_img"
            style={{
              width: `${size[0] * (zoomLevel / 100)}px`,
              height: `${size[1] * (zoomLevel / 100)}px`,
              backgroundImage: `url(${url})`,
            }}
          ></div>
        ) : type.indexOf('video') > -1 ? (
          <video
            ref={videoRef}
            width={size[0] * (zoomLevel / 100)}
            height={size[1] * (zoomLevel / 100)}
            controls
            autoPlay
            playsInline
            muted
          >
            <source src={url} type={type}></source>
          </video>
        ) : (
          <iframe
            className="preview_frame"
            ref={iFrameRef}
            id={`preview_frame_${id}`}
            title={id}
            // width={`${size[0]}px`}
            // height={`${size[1]}px`}
            width={`${size[0] * (zoomLevel / 100)}px`}
            height={`${size[1] * (zoomLevel / 100)}px`}
            src={url}
          ></iframe>
        )}
      </li>

      <div className="unit-nav">
        <ul className="preview-nav">
          {/* <li>
            <a className="btn-icon" onClick={props.onPreviewClose}>
              
            </a>
          </li> */}
          <li>
            {/* <a className="btn-icon" onClick={onPreviewRefresh}>
              
            </a> */}
            <a className="btn btn-grey" onClick={onPreviewRefresh}>
              Refresh
              {/* Refresh <span className="icon-text"></span> */}
            </a>
          </li>
          <li>
            {/* <a className="btn-text" href={url} target="_blank" rel="noreferrer">
              {url}
            </a> */}
            <a
              className="btn btn-grey"
              href={url}
              target="_blank"
              rel="noreferrer"
            >
              {/* Isolate <span className="icon-text">&#xF32E;</span> */}
              Isolate <span className="icon-text">&#xf32d;</span>
              {/* Isolate <span className="icon-text">&#xF32F;</span> */}
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Preview;
