import { useEffect, useState, useRef } from "react";

// Extend Window interface for ShopifyBuy
declare global {
  interface Window {
    ShopifyBuy: any;
  }
}

interface ShopifyBuyButtonProps {
  className?: string;
}

export default function ShopifyBuyButton({ className = "" }: ShopifyBuyButtonProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    const scriptURL = "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";
    const containerId = "product-component-1782755287286";

    const initializeShopify = () => {
      if (initializedRef.current) return;
      initializedRef.current = true;

      try {
        const client = window.ShopifyBuy.buildClient({
          domain: "bys-store-3124694-517495.myshopify.com",
          storefrontAccessToken: "302e0ab2a9fdbad27ca01996e91531bb",
        });

        window.ShopifyBuy.UI.onReady(client).then((ui: any) => {
          // Clear container content before rendering to avoid duplicates
          const targetNode = document.getElementById(containerId);
          if (targetNode) {
            targetNode.innerHTML = "";
          }

          ui.createComponent("product", {
            id: "7765164228817",
            node: targetNode,
            moneyFormat: "%24%7B%7Bamount%7D%7D",
            options: {
              product: {
                styles: {
                  product: {
                    "@media (min-width: 601px)": {
                      "max-width": "100%",
                      "margin-left": "0px",
                      "margin-bottom": "0px",
                    },
                    "text-align": "left",
                  },
                  button: {
                    "font-family": "'Plus Jakarta Sans', sans-serif",
                    "font-weight": "600",
                    "font-size": "16px",
                    "padding-top": "15px",
                    "padding-bottom": "15px",
                    "padding-left": "40px",
                    "padding-right": "40px",
                    ":hover": {
                      "background-color": "#2F5D1E",
                    },
                    "background-color": "#6FAF32",
                    "border-radius": "9999px",
                    "transition": "all 0.3s ease",
                  },
                  quantityInput: {
                    "font-size": "15px",
                    "padding-top": "10px",
                    "padding-bottom": "10px",
                  },
                },
                text: {
                  button: "Add to Cart",
                },
                contents: {
                  img: false,
                  title: false,
                  price: false,
                  options: true,
                  quantity: true,
                  button: true,
                },
              },
              productSet: {
                styles: {
                  products: {
                    "@media (min-width: 601px)": {
                      "margin-left": "-20px",
                    },
                  },
                },
              },
              modalProduct: {
                contents: {
                  img: false,
                  imgWithCarousel: true,
                  button: false,
                  buttonWithQuantity: true,
                },
                styles: {
                  product: {
                    "@media (min-width: 601px)": {
                      "max-width": "100%",
                      "margin-left": "0px",
                      "margin-bottom": "0px",
                    },
                  },
                },
                text: {
                  button: "Add to cart",
                },
              },
              option: {},
              cart: {
                styles: {
                  button: {
                    "background-color": "#6FAF32",
                    ":hover": {
                      "background-color": "#2F5D1E",
                    },
                    "border-radius": "9999px",
                  },
                },
                text: {
                  total: "Subtotal",
                  button: "Checkout Now",
                },
                popup: false,
              },
              toggle: {
                styles: {
                  toggle: {
                    "background-color": "#6FAF32",
                    ":hover": {
                      "background-color": "#2F5D1E",
                    },
                  },
                },
              },
            },
          });
          setIsLoaded(true);
        });
      } catch (err) {
        console.error("Shopify Buy SDK error:", err);
      }
    };

    const loadScript = () => {
      const script = document.createElement("script");
      script.async = true;
      script.src = scriptURL;
      document.head.appendChild(script);
      script.onload = initializeShopify;
    };

    if (window.ShopifyBuy) {
      if (window.ShopifyBuy.UI) {
        initializeShopify();
      } else {
        loadScript();
      }
    } else {
      loadScript();
    }

    // Cleanup: we don't destroy global SDK but we ensure no duplicates if unmounted
    return () => {
      initializedRef.current = false;
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      {!isLoaded && (
        <div className="animate-pulse flex flex-col space-y-4">
          <div className="h-12 bg-neutral-200 dark:bg-neutral-800 rounded-full w-full" />
          <div className="h-5 bg-neutral-200 dark:bg-neutral-800 rounded w-1/2" />
        </div>
      )}
      <div id="product-component-1782755287286" ref={containerRef} className="w-full" />
    </div>
  );
}
