import "./styles/Work.css";
import WorkImage from "./WorkImage";

const Work = () => {
  /* GSAP Horizontal Scroll Logic Removed */
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {[
            {
              id: "01",
              title: "Dubai Municipality Project",
              category: "Import and Export Dashboard for Vendors and Consumers",
              technologies: "React.js, TypeScript, Redux Toolkit, OpenAI APIs, MUI, Ant Design",
              image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
              alt: "Dubai Municipality Project",
            },
            {
              id: "02",
              title: "EarnFlex",
              category: "Workforce Management System",
              technologies: "React, React Native, Node.js, Express, MongoDB, Piper TTS, Ollama",
              image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop",
              alt: "EarnFlex Workforce Management",
            },
            {
              id: "03",
              title: "Vertech",
              category: "Big Machinery Data Management System",
              technologies: "React.js, TypeScript, Python, Data Visualization",
              image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
              alt: "Vertech Data Management",
            },
            {
              id: "04",
              title: "Barber2Me",
              category: "Barber Booking System",
              technologies: "React Native, Node.js, Express, MySQL",
              image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop",
              alt: "Barber2Me Booking System",
            },
            {
              id: "05",
              title: "Driverly",
              category: "Uber-like Application",
              technologies: "React Native, Real-time APIs, GPS Integration",
              image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=800&auto=format&fit=crop",
              alt: "Driverly Ride-Hailing App",
            },
            {
              id: "06",
              title: "Gturbo",
              category: "Inventory Management System",
              technologies: "React.js, TypeScript, Redux, Database Integration",
              image: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?q=80&w=800&auto=format&fit=crop",
              alt: "Gturbo Inventory System",
            }
          ].map((project) => (
            <div className="work-box" key={project.id}>
              <div className="work-info">
                <div className="work-title">
                  <h3>{project.id}</h3>
                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Technologies</h4>
                <p>{project.technologies}</p>
              </div>
              <WorkImage image={project.image} alt={project.alt} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
