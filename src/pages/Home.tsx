import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, Phone, Linkedin, Github, Instagram, BookOpen, ExternalLink } from 'lucide-react';
import { projects } from '../data/projects';
import { fetchBlogs, getBlogs, Blog } from '../data/blogs';

const Home: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>(getBlogs());

  useEffect(() => {
    fetchBlogs().then(data => {
      if (data) setBlogs(data);
    });
  }, []);

  const revealVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
    }
  };

  return (
    <>
      <section id="hero">
        <div className="container hero-content">
          <div className="hero-flex">
            <motion.div 
              className="hero-image float-animation"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img src="images/9.jpeg" alt="Sanoop Das M" referrerPolicy="no-referrer" />
            </motion.div>
            <motion.div 
              className="hero-text"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="hero-role">Multi-Platform Flutter Developer</span>
              <h1>Crafting Seamless Experiences Across All Screens.</h1>
              <p>Hi, I'm Sanoop Das M. I specialize in building high-performance applications for Windows, macOS, Web, Android, and iOS using Flutter.</p>
              <div className="hero-platforms">
                <span className="platform-tag shine-effect">Windows</span>
                <span className="platform-tag shine-effect">macOS</span>
                <span className="platform-tag shine-effect">Web</span>
                <span className="platform-tag shine-effect">Android</span>
                <span className="platform-tag shine-effect">iOS</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="about" className="section">
        <motion.div 
          className="container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealVariants}
        >
          <h2 className="section-title">About Me</h2>
          <div className="about-grid grid">
            <div className="about-text">
              <p>I am a passionate Flutter Developer with a strong focus on creating multi-platform applications that provide a consistent and high-quality user experience. With expertise in Dart and the Flutter framework, I've successfully delivered solutions for desktop, mobile, and web environments.</p>
              <p>My approach combines clean architecture with intuitive UI/UX design, ensuring that every project is not only functional but also a delight to use.</p>
            </div>
            <div className="about-stats">
              <div className="stat-card shine-effect">
                <h3>2.9+</h3>
                <p>Years Experience</p>
              </div>
              <div className="stat-card shine-effect">
                <h3>20+</h3>
                <p>Projects Completed</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section id="experience" className="section">
        <motion.div 
          className="container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealVariants}
        >
          <h2 className="section-title">Experience</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>Senior Flutter Developer</h3>
                <span className="timeline-company">Artifitia Solutions LLP | Calicut, KL</span>
                <span className="timeline-date">04/2026 - Present</span>
                <p>Promoted to Senior role. Leading development practices, mentoring team members, and driving architect-level decisions for high-scale multi-platform client applications.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>Flutter Developer</h3>
                <span className="timeline-company">Artifitia Solutions LLP | Calicut, KL</span>
                <span className="timeline-date">04/2025 - 04/2026</span>
                <p>Maintained 50+ mobile applications across bullion tracking, e-commerce, and trading. Refactored legacy codebases and implemented standardized, robust project structures.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>Software Developer</h3>
                <span className="timeline-company">Freelance | Malappuram</span>
                <span className="timeline-date">11/2024 - 04/2025</span>
                <p>Developed DB-Billmate, a custom offline billing software with invoice generation, inventory management, and sales tracking using Flutter and SQLite.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>Flutter Developer</h3>
                <span className="timeline-company">Screl Info Pvt. Ltd. | KL</span>
                <span className="timeline-date">11/2023 - 11/2024</span>
                <p>Designed and developed cross-platform applications, boosting downloads by 40% and user retention by 15% through effective UI/UX and performance optimization.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>Flutter Developer Intern</h3>
                <span className="timeline-company">Ralfiz Technologies | KL</span>
                <span className="timeline-date">07/2023 - 11/2023</span>
                <p>Gained expertise in the Flutter framework and participated in all stages of the development lifecycle, from planning to deployment.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section id="skills" className="section">
        <motion.div 
          className="container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealVariants}
        >
          <h2 className="section-title">Skills</h2>
          <motion.div 
            className="skills-grid grid"
            variants={staggerContainer}
          >
            {[
              'Flutter & Dart', 'Riverpod & Bloc', 'MVVM Architecture', 
              'Firebase & MongoDB', 'SQLite & Hive', 'REST APIs', 
              'UI/UX Design (Figma)', 'Git & Agile'
            ].map((skill) => (
              <motion.div key={skill} className="skill-card shine-effect" variants={staggerItem}>
                {skill}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <section id="education" className="section">
        <motion.div 
          className="container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealVariants}
        >
          <h2 className="section-title">Education</h2>
          <div className="education-grid grid">
            <div className="education-card shine-effect">
              <h3>Master of Computer Applications (MCA)</h3>
              <p className="education-place">Hindusthan College of Engineering and Technology | Coimbatore</p>
              <span className="education-date">Completed: 04/2023</span>
              <p className="education-score">Score: 75.4%</p>
            </div>
            <div className="education-card shine-effect">
              <h3>BSc. Computer Science</h3>
              <p className="education-place">KR’s Sree Narayana College | Malappuram</p>
              <span className="education-date">Completed: 11/2020</span>
              <p className="education-score">Score: 54.6%</p>
            </div>
          </div>
        </motion.div>
      </section>

      <section id="conferences" className="section">
        <motion.div 
          className="container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealVariants}
        >
          <h2 className="section-title">Conferences & Presentations</h2>
          <div className="conference-card shine-effect">
            <h3>Paper Presentation: "Plant Identification Using TensorFlow"</h3>
            <p>Presented at the <strong>International Conference on Smart Innovative Technologies on Data Analytics (ICSITDA '23)</strong>.</p>
            <p>Sponsored by ICT Academy and organized by the Department of Computer Applications, Ayya Nadar Janaki Ammal College, May 26, 2023.</p>
          </div>
        </motion.div>
      </section>

      <section id="languages" className="section">
        <motion.div 
          className="container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealVariants}
        >
          <h2 className="section-title">Languages</h2>
          <div className="languages-flex">
            {['English', 'Malayalam', 'Hindi', 'Tamil'].map((lang) => (
              <div key={lang} className="language-tag shine-effect">
                {lang}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="projects" className="section">
        <motion.div 
          className="container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealVariants}
        >
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle">Click on a project to see more details.</p>
          <motion.div 
            className="projects-grid grid"
            variants={staggerContainer}
          >
            {Object.values(projects).map((project) => (
              <motion.div key={project.id} variants={staggerItem}>
                <Link to={`/projects/${project.id}`} className="project-card-link">
                  <div className="project-card shine-effect">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <span className="view-more">View Details &rarr;</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="plugins-cta"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>I also contribute to the Flutter ecosystem with open-source plugins.</p>
            <a href="https://pub.dev/publishers/sanoop.dev/packages" target="_blank" rel="noopener noreferrer" className="btn shine-effect" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}>
              <BookOpen size={20} />
              View My Flutter Plugins on Pub.dev
            </a>
          </motion.div>
        </motion.div>
      </section>

      <section id="fun-link" className="section">
        <motion.div 
          className="container" 
          style={{ textAlign: 'center' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealVariants}
        >
          <h2 className="section-title">Fun Zone</h2>
          <p>Take a break and play some games I've built.</p>
          <Link to="/fun" className="btn">Go to Fun Zone</Link>
        </motion.div>
      </section>

      <section id="blog" className="section">
        <motion.div 
          className="container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealVariants}
        >
          <h2 className="section-title">Latest Articles</h2>
          <p className="section-subtitle">Insights and thoughts on Flutter, Dart, and multi-platform development.</p>
          
          <motion.div 
            className="blog-grid grid"
            variants={staggerContainer}
          >
            {blogs.map((blog) => (
              <motion.div key={blog.id} variants={staggerItem}>
                <a href={blog.url} target="_blank" rel="noopener noreferrer" className="blog-card-link">
                  <div className="blog-card shine-effect">
                    {blog.imageUrl && (
                      <div className="blog-card-img-container">
                        <img 
                          src={blog.imageUrl} 
                          alt={blog.title} 
                          className="blog-card-img" 
                          onError={(e) => {
                            // If the image fails to load, hide or replace with placeholder
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}
                    <div className="blog-card-body">
                      <div>
                        <div className="blog-meta">
                          <span>{blog.date}</span>
                          <span className="blog-dot">&bull;</span>
                          <span>{blog.readTime}</span>
                        </div>
                        <h3>{blog.title}</h3>
                        <p>{blog.description}</p>
                      </div>
                      <span className="blog-link">
                        Read on Medium <ExternalLink size={14} style={{ display: 'inline', marginLeft: '4px', verticalAlign: 'middle' }} />
                      </span>
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </motion.div>

          {blogs.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem', background: 'var(--gray)', borderRadius: '1rem' }}>
              <p style={{ color: 'var(--accent)', margin: 0 }}>No articles posted yet. Check back soon!</p>
            </div>
          )}
        </motion.div>
      </section>

      <section id="contact" className="section">
        <motion.div 
          className="container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealVariants}
        >
          <h2 className="section-title">Get In Touch</h2>
          <div className="contact-grid grid">
            <div className="contact-info">
              <p>I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.</p>
              <div className="contact-details">
                <div className="contact-detail-item">
                  <Mail size={20} />
                  <span>msanoopdb1@gmail.com</span>
                </div>
                <div className="contact-detail-item">
                  <Phone size={20} />
                  <span>+91 9656595353</span>
                </div>
              </div>
            </div>
            <motion.div 
              className="contact-social-links"
              variants={staggerContainer}
            >
              <motion.a variants={staggerItem} href="https://www.linkedin.com/in/sanoopdas" target="_blank" rel="noopener noreferrer" className="social-icon-card shine-effect" aria-label="LinkedIn">
                <Linkedin size={24} />
                <span>LinkedIn</span>
              </motion.a>
              <motion.a variants={staggerItem} href="mailto:msanoopdb1@gmail.com" className="social-icon-card shine-effect" aria-label="Email">
                <Mail size={24} />
                <span>Email</span>
              </motion.a>
              <motion.a variants={staggerItem} href="https://www.instagram.com/_sanoop_das" target="_blank" rel="noopener noreferrer" className="social-icon-card shine-effect" aria-label="Instagram">
                <Instagram size={24} />
                <span>Instagram</span>
              </motion.a>
              <motion.a variants={staggerItem} href="https://medium.com/@sd2b" target="_blank" rel="noopener noreferrer" className="social-icon-card shine-effect" aria-label="Medium">
                <BookOpen size={24} />
                <span>Medium</span>
              </motion.a>
              <motion.a variants={staggerItem} href="https://github.com/SD2B" target="_blank" rel="noopener noreferrer" className="social-icon-card shine-effect" aria-label="GitHub">
                <Github size={24} />
                <span>GitHub</span>
              </motion.a>
              <motion.a variants={staggerItem} href="tel:+919656595353" className="social-icon-card shine-effect" aria-label="Phone">
                <Phone size={24} />
                <span>Phone</span>
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Home;
