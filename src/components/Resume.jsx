import React from 'react';
import { Briefcase, Code, GraduationCap, Award, FileText, LayoutTemplate, Server, Database, Cloud, Terminal } from 'lucide-react';
import './Resume.css';

const Resume = () => {
  return (
    <section className="resume-section animate-fade-in" id="resume">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">My <span className="text-gradient">Resume</span></h2>
          <p className="section-subtitle">A detailed overview of my professional experience, skills, and education.</p>
        </div>

        <div className="resume-content">
          {/* Summary */}
          <div className="resume-card glass mb-2">
            <div className="resume-card-header">
              <div className="resume-icon-container">
                <FileText size={24} color="var(--accent)" />
              </div>
              <h3>Professional Summary</h3>
            </div>
            <p className="resume-summary-text">
              Software Developer with 4+ years of experience building scalable backend, AI/ML, and cloud-native applications across healthcare, insurance, and education domains. Skilled in Python, SQL, and REST APIs with strong expertise in Generative AI, Large Language Models (LLMs), NLP, and machine learning pipelines. Experienced in developing Retrieval Augmented Generation (RAG) systems, agentic AI workflows, and LLM-powered applications using LangChain, HuggingFace Transformers, CrewAI, and AWS Bedrock. Proficient in deploying production-grade AI systems using FastAPI, Docker, and AWS serverless architecture with strong understanding of SDLC, Agile development, and DevOps practices.
            </p>
          </div>

          <div className="resume-grid">
            {/* Left Column */}
            <div className="resume-col">
              {/* Technical Skills */}
              <div className="resume-card glass">
                <div className="resume-card-header">
                  <div className="resume-icon-container">
                    <Code size={24} color="var(--accent)" />
                  </div>
                  <h3>Technical Skills</h3>
                </div>
                
                <div className="skills-group">
                  <h4><Terminal size={16} /> Languages & Databases</h4>
                  <p><strong>Languages:</strong> Python, SQL</p>
                  <p><strong>Databases:</strong> PostgreSQL, MongoDB, MySQL (RDS), DynamoDB</p>
                </div>
                
                <div className="skills-group">
                  <h4><Server size={16} /> Frameworks & Tools</h4>
                  <p><strong>Frameworks:</strong> FastAPI, Flask</p>
                  <p><strong>DevOps & Tools:</strong> Docker, CI/CD Pipelines, Git, GitHub, Bitbucket, Postman, PyCharm, VS Code, JIRA, Trello</p>
                </div>

                <div className="skills-group">
                  <h4><Cloud size={16} /> Cloud & Infrastructure</h4>
                  <p><strong>AWS:</strong> Lambda, S3, Textract, API Gateway, SNS, SQS, SAM, Bedrock, SageMaker</p>
                </div>

                <div className="skills-group">
                  <h4><LayoutTemplate size={16} /> AI / Machine Learning</h4>
                  <p><strong>Core AI:</strong> Generative AI, LLMs, RAG, NLP, Transformer Models, Neural Networks, Prompt Engineering, Agentic AI Systems</p>
                  <p><strong>AI Frameworks:</strong> LangChain, HuggingFace Transformers, CrewAI, AutoGen, Streamlit</p>
                  <p><strong>Data Science:</strong> Pandas, NumPy, Matplotlib, Data Preprocessing, Model Evaluation</p>
                </div>
              </div>

              {/* Certifications */}
              <div className="resume-card glass">
                <div className="resume-card-header">
                  <div className="resume-icon-container">
                    <Award size={24} color="var(--accent)" />
                  </div>
                  <h3>Certifications</h3>
                </div>
                <ul className="resume-list">
                  <li><strong>AWS Certified Developer – Associate</strong> <br/><span className="text-secondary">I.D. - 6c84a334a092476794bdf4f50d7d8819</span></li>
                  <li><strong>SnowPro Core (Snowflake)</strong> <br/><span className="text-secondary">I.D. - S55331-240529-COF</span></li>
                  <li><strong>SnowPro Advanced: Data Engineer (Snowflake)</strong> <br/><span className="text-secondary">I.D. - S55331-241210-DEA</span></li>
                </ul>
              </div>

              {/* Education */}
              <div className="resume-card glass">
                <div className="resume-card-header">
                  <div className="resume-icon-container">
                    <GraduationCap size={24} color="var(--accent)" />
                  </div>
                  <h3>Education</h3>
                </div>
                <div className="timeline-item">
                  <h4>M.Tech in Cloud Computing</h4>
                  <p className="text-secondary">Indian Institute of Technology (IIT) Patna</p>
                </div>
                <div className="timeline-item">
                  <h4>B.Tech in Computer Science Engineering</h4>
                  <p className="text-secondary">R.V.S College of Engineering and Technology</p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="resume-col">
              {/* Professional Experience */}
              <div className="resume-card glass">
                <div className="resume-card-header">
                  <div className="resume-icon-container">
                    <Briefcase size={24} color="var(--accent)" />
                  </div>
                  <h3>Professional Experience</h3>
                </div>
                
                <div className="timeline-item">
                  <div className="timeline-header">
                    <h4>Software Developer SDE-1</h4>
                    <span className="timeline-date text-gradient">Mar 2022 – Present</span>
                  </div>
                  <p className="timeline-company text-secondary">Teqfocus Solutions Pvt. Ltd. | India</p>
                  <ul className="timeline-list">
                    <li>Developed scalable cloud-native software systems and AI-powered applications for insurance and healthcare clients using Python and AWS serverless architecture.</li>
                    <li>Designed and deployed machine learning pipelines using AWS SageMaker and Lambda for intelligent document processing and data analytics, reducing document turnaround time by 70%.</li>
                    <li>Built LLM-powered applications using LangChain, HuggingFace Transformers, and AWS Bedrock serving 10K+ monthly queries.</li>
                    <li>Implemented Retrieval Augmented Generation (RAG) pipelines and prompt engineering techniques to enhance contextual response generation for enterprise AI applications.</li>
                    <li>Developed NLP models for clinical document analysis and sentiment classification using transformer-based architectures, improving prediction accuracy by 25%.</li>
                    <li>Designed agentic AI workflows using CrewAI and AutoGen to orchestrate multi-agent automation tasks for enterprise processes.</li>
                    <li>Developed backend APIs and microservices using FastAPI and integrated AI models with enterprise databases and cloud services.</li>
                    <li>Implemented containerized deployments using Docker and CI/CD pipelines to improve DevOps efficiency and release cycles.</li>
                    <li>Mentored junior developers and collaborated with cross-functional teams to deliver AI-driven solutions aligned with client business requirements.</li>
                  </ul>
                </div>
              </div>

              {/* Projects */}
              <div className="resume-card glass">
                <div className="resume-card-header">
                  <div className="resume-icon-container">
                    <Code size={24} color="var(--accent)" />
                  </div>
                  <h3>Key Projects</h3>
                </div>

                <div className="timeline-item">
                  <h4>Vetty (Automated Background Checks)</h4>
                  <p className="tech-stack text-secondary">Python, Flask, MongoDB, Celery</p>
                  <ul className="timeline-list">
                    <li>Developed backend APIs and async background job processing system for HR verification workflows. Reduced verification time by 15% for certain cases.</li>
                  </ul>
                </div>

                <div className="timeline-item">
                  <h4>Cluō (Label Detection & Food Safety)</h4>
                  <p className="tech-stack text-secondary">SageMaker, Rekognition, SAM, API Gateway</p>
                  <ul className="timeline-list">
                    <li>Deployed software solution to detect fake food labels using image classification models and cloud APIs.</li>
                  </ul>
                </div>

                <div className="timeline-item">
                  <h4>Armour Processing (Intelligent Document Processing)</h4>
                  <p className="tech-stack text-secondary">Textract, DynamoDB, Lambda, Bedrock, SQS</p>
                  <ul className="timeline-list">
                    <li>Developed a cloud-native Intelligent Document Processing system using AWS Textract and serverless components.</li>
                    <li>Built Retrieval Augmented Generation (RAG) pipelines and AI chatbot workflows to automate document understanding and information retrieval.</li>
                  </ul>
                </div>

                <div className="timeline-item">
                  <h4>Gentoro (Python SDK Development)</h4>
                  <p className="tech-stack text-secondary">Python, PyPI, UV</p>
                  <ul className="timeline-list">
                    <li>Developed and published a reusable Python SDK for Gentoro to facilitate API integrations.</li>
                    <li>Deployed the SDK to PyPI and managed versioning using UV, ensuring developer friendly documentation and modular design.</li>
                  </ul>
                </div>

                <div className="timeline-item">
                  <h4>Lumata (Health Care Client)</h4>
                  <p className="tech-stack text-secondary">Python, BRD, FCS</p>
                  <ul className="timeline-list">
                    <li>Collaborate with the product team on an ongoing healthcare project to convert BRD into FSD/FCS, refining functional requirements, workflows, and validations.</li>
                    <li>Implement the approved functional specifications through hands-on backend development using Python and AWS, working with the team to ship requirements.</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
