import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Senior Frontend Developer</h4>
                <h5>Xische & Co (Dubai Municipality Project)</h5>
              </div>
              <h3>2025 - Present</h3>
            </div>
            <p>
              Engineered dynamic user interfaces with React.js and TypeScript, ensuring seamless integration with backend APIs and improving user engagement. Refined application workflows by implementing robust state management using Redux Toolkit, enhancing the reliability of real-time data updates across complex modules. Utilized OpenAI APIs and Generative AI to streamline content creation and handle large datasets, improving application intelligence and user engagement.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Senior Frontend Developer</h4>
                <h5>EarnFlex</h5>
              </div>
              <h3>2023 - 2025</h3>
            </div>
            <p>
              Led the development of user-centric applications using React, React Native, JavaScript, Vue, and TypeScript, delivering clean, modular, and efficient code. Built cross-platform mobile applications with React Native, ensuring a seamless user experience on both iOS and Android devices. Improved workflow efficiency by standardizing state management practices with Redux and Vuex, streamlining collaboration with backend and QA teams. Integrated Piper TTS with Ollama to enable advanced text-to-speech capabilities within applications.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Frontend Developer</h4>
                <h5>Horizon Digital</h5>
              </div>
              <h3>2022 - 2023</h3>
            </div>
            <p>
              Developed secure, high-performing web and mobile applications using React, React Native, Vue, JavaScript, Flutter, and TypeScript. Implemented responsive, accessible UI/UX designs, ensuring compatibility across multiple devices and browsers. Collaborated with design and backend teams to deliver feature-rich applications on schedule. Managed post-launch activities, including documentation, client training, and ongoing support. Leveraged OpenAI APIs to process and organize large datasets into structured documents.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Frontend Developer</h4>
                <h5>TechXperts</h5>
              </div>
              <h3>2021 - 2022</h3>
            </div>
            <p>
              Developed interactive, responsive applications using React, React Native, and TypeScript. Integrated Redux for state management, enabling efficient data flow and smooth user experiences. Optimized front-end performance, achieving significant improvements in load times and interactivity. Engaged directly with clients to provide updates, gather feedback, and ensure overall satisfaction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
