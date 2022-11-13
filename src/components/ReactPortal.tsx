import { ReactElement, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

const createPortalAndAppendToBody = (portalId: string) => {
  const portalElement = document.createElement("div");
  portalElement.setAttribute("id", portalId);
  document.body.appendChild(portalElement);
  return portalElement;
};

const ReactPortal = ({
  children,
  portalId = "portal-container",
}: {
  children: ReactElement;
  portalId: string;
}) => {
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    let element = document.getElementById(portalId);
    let systemCreated = false;
    if (!element) {
      systemCreated = true;
      element = createPortalAndAppendToBody(portalId);
    }
    setPortalElement(element);

    return () => {
      if (systemCreated && element?.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [portalId]);

  if (portalElement === null) return null;
  return createPortal(children, portalElement);
};

export default ReactPortal;
