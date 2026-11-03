
import { useEffect } from "react";

const GlobalScrollReveal = () => {
  useEffect(() => {
    const selector =
      "section, article, footer, main > div, .grid > *, [data-scroll-reveal]";

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const scanElements = (root) => {
      const elements = [];

      if (root.matches?.(selector)) {
        elements.push(root);
      }

      elements.push(...root.querySelectorAll(selector));

      elements.forEach((element) => {
        if (element.dataset.scrollRevealReady) return;

        element.dataset.scrollRevealReady = "true";
        element.classList.add("scroll-reveal");
        observer.observe(element);
      });
    };

    scanElements(document);

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            scanElements(node);
          }
        });
      });
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, []);

  return null;
};

export default GlobalScrollReveal;
