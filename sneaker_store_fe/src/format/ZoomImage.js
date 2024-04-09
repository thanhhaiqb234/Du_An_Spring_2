import React, { useEffect, useRef } from "react";

const Zoom = ({ url, onZoomIn, onZoomOut, magnify }) => {
  const targetRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const target = targetRef.current;
    const image = imageRef.current;
    let zoomed = false;

    const init = () => {
      const targetWidth = target.offsetWidth;
      const targetHeight = target.offsetHeight;
      const imageWidth = image.width;
      const imageHeight = image.height;

      const widthRatio = imageWidth / targetWidth;
      const heightRatio = imageHeight / targetHeight;

      image.style.width = `${(imageWidth / widthRatio) * magnify}px`;
      image.style.height = `${(imageHeight / heightRatio) * magnify}px`;
    };

    const move = (event) => {
      const targetRect = target.getBoundingClientRect();
      const mouseX = event.clientX - targetRect.left;
      const mouseY = event.clientY - targetRect.top;

      const zoomedWidth = image.offsetWidth;
      const zoomedHeight = image.offsetHeight;

      const offsetX =
        (mouseX / target.offsetWidth) * (zoomedWidth - target.offsetWidth);
      const offsetY =
        (mouseY / target.offsetHeight) * (zoomedHeight - target.offsetHeight);

      image.style.transform = `translate(${-offsetX}px, ${-offsetY}px)`;
    };

    const zoomIn = () => {
      if (!zoomed) {
        image.style.opacity = "1";
        zoomed = true;
        if (onZoomIn) {
          onZoomIn();
        }
      }
    };

    const zoomOut = () => {
      if (zoomed) {
        image.style.opacity = "0";
        image.style.transform = "translate(0, 0)";
        zoomed = false;
        if (onZoomOut) {
          onZoomOut();
        }
      }
    };

    const setupZoom = () => {
      target.addEventListener("mouseenter", zoomIn);
      target.addEventListener("mouseleave", zoomOut);
      target.addEventListener("mousemove", move);
    };

    const destroyZoom = () => {
      target.removeEventListener("mouseenter", zoomIn);
      target.removeEventListener("mouseleave", zoomOut);
      target.removeEventListener("mousemove", move);
    };

    init();
    setupZoom();

    return () => {
      destroyZoom();
    };
  }, [url, onZoomIn, onZoomOut, magnify]);

  return (
    <div ref={targetRef} style={{ position: "relative", overflow: "hidden" }}>
      <img
        ref={imageRef}
        src={url}
        alt=""
        // style={{
        //   position: "absolute",
        //   top: 0,
        //   left: 0,
        //   opacity: 0,
        //   border: "none",
        //   maxWidth: "none",
        //   maxHeight: "none",
        // }}
      />
    </div>
  );
};

export default Zoom;