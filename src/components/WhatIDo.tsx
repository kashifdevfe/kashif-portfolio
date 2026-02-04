import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";


const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };
  useEffect(() => {
    containerRef.current.forEach((container) => {
      if (container) {
        container.classList.remove("what-noTouch");
        container.addEventListener("click", () => handleClick(container));
      }
    });

    return () => {
      containerRef.current.forEach((container) => {
        if (container) {
          container.removeEventListener("click", () => handleClick(container));
        }
      });
    };
  }, []);
  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 0)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>DEVELOP</h3>
              <h4>Frontend & Full-Stack Development</h4>
              <p>
                5+ years of experience designing and developing responsive, user-centric web applications using React.js and TypeScript. Specialized in creating high-performance interfaces that seamlessly integrate with backend APIs and deliver exceptional user experiences.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">React.js</div>
                <div className="what-tags">TypeScript</div>
                <div className="what-tags">JavaScript</div>
                <div className="what-tags">React Native</div>
                <div className="what-tags">Node.js</div>
                <div className="what-tags">Express.js</div>
                <div className="what-tags">Next.js</div>
                <div className="what-tags">Redux Toolkit</div>
                <div className="what-tags">MongoDB</div>
                <div className="what-tags">MySQL</div>
                <div className="what-tags">Python</div>
                <div className="what-tags">OpenAI APIs</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 1)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>DESIGN</h3>
              <h4>UI/UX & AI-Enhanced Solutions</h4>
              <p>
                Creating intuitive, accessible user interfaces with modern design principles. Leveraging AI and Generative AI technologies including OpenAI tools to enhance application functionality and deliver intelligent, personalized user experiences.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">UI/UX Design</div>
                <div className="what-tags">Figma</div>
                <div className="what-tags">Adobe XD</div>
                <div className="what-tags">MUI</div>
                <div className="what-tags">Tailwind CSS</div>
                <div className="what-tags">Chakra UI</div>
                <div className="what-tags">Ant Design</div>
                <div className="what-tags">Bootstrap</div>
                <div className="what-tags">OpenAI APIs</div>
                <div className="what-tags">Generative AI</div>
                <div className="what-tags">Piper TTS</div>
                <div className="what-tags">Ollama</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);

    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}
