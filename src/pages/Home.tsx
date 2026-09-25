import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, Phone, Linkedin, Github, Instagram, BookOpen, ExternalLink, Calendar, Clock, Tag } from 'lucide-react';
import portraitImg from '../assets/images/profile.jpg';
import { projects } from '../data/projects';
import { experiences, calculateExperienceStats } from '../data/experience';
import { blogs } from '../data/blogs';

const Home: React.FC = () => {
  const experienceStats = useMemo(() => calculateExperienceStats(experiences), []);

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
              <div className="hero-portrait-frame">
                <img 
                  src={portraitImg} 
                  alt="Sanoop Das M" 
                  referrerPolicy="no-referrer" 
                />
                <div className="hero-portrait-badge">
                  <span className="badge-dot"></span>
                  <span>Senior Flutter Dev</span>
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="hero-text"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="hero-role">Multi-Platform Software Developer</span>
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
              <p>Senior Flutter Developer with {experienceStats.yearsFormatted} of professional experience and 50+ production apps shipped across fintech, trading, e-commerce, and ERP domains. Specializes in real-time data applications (bullion rates, forex/crypto trading, digital gold & silver holdings) with WebSocket integrations, Firebase services (Authentication, Firestore, Cloud Messaging), and end-to-end REST API integration.</p>
              <p>Leads architecture decisions, code reviews, and reusable-component standards for development teams, and owns release management across the Google Play Store and Apple App Store. Proven track record of boosting downloads (+40%) and retention (+15%) through cross-platform delivery on Android, iOS, web, and desktop.</p>
            </div>
            <div className="about-stats">
              <div className="stat-card shine-effect">
                <h3>{experienceStats.yearsFormatted}</h3>
                <p>Years Experience</p>
              </div>
              <div className="stat-card shine-effect">
                <h3>50+</h3>
                <p>Production Apps Shipped</p>
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
            {experiences.map((exp) => (
              <div key={exp.id} className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h3>{exp.role}</h3>
                  <span className="timeline-company">{exp.company} | {exp.location}</span>
                  <span className="timeline-date">{exp.startDate} - {exp.endDate}</span>
                  <p>{exp.description}</p>
                </div>
              </div>
            ))}
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
            </div>
            <div className="education-card shine-effect">
              <h3>BSc. Computer Science</h3>
              <p className="education-place">KR’s Sree Narayana College | Malappuram</p>
              <span className="education-date">Completed: 11/2020</span>
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
                <Link 
                  to={`/projects/${project.id}`} 
                  className="project-card-link"
                  onClick={() => {
                    try {
                      sessionStorage.setItem('scroll_/', window.scrollY.toString());
                    } catch {
                      // ignore
                    }
                  }}
                >
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
            <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>I also contribute to the Flutter community with open-source plugins and packages.</p>
            <a href="https://pub.dev/publishers/sanoop.dev/packages" target="_blank" rel="noopener noreferrer" className="btn shine-effect" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}>
              <BookOpen size={20} />
              View My Flutter Plugins & Packages on Pub.dev
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Blogs & Engineering Articles Section */}
      <section id="blogs" className="section">
        <motion.div 
          className="container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealVariants}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
            <div>
              <h2 className="section-title">Technical Articles & Insights</h2>
              <p className="section-subtitle">
                Original deep-dives into Flutter internals, multi-threading, concurrency, state management, and software engineering.
              </p>
            </div>
            <a 
              href="https://medium.com/@sd2b" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="blog-action-btn primary"
              style={{ marginTop: '0.5rem' }}
            >
              <BookOpen size={16} />
              <span>Follow on Medium</span>
              <ExternalLink size={14} />
            </a>
          </div>

          {/* Blog Cards Grid */}
          <motion.div 
            className="blog-grid"
            variants={staggerContainer}
          >
            {blogs.map((blog) => (
              <motion.a 
                key={blog.id} 
                href={blog.mediumUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="blog-card blog-card-link"
                variants={staggerItem}
                title={`Read "${blog.title}" on Medium`}
              >
                {blog.coverImage && (
                  <div className="blog-card-img-container">
                    <img 
                      src={blog.coverImage} 
                      alt={blog.title} 
                      className="blog-card-img" 
                      loading="lazy"
                    />
                    <div className="blog-read-badge">
                      <Clock size={12} />
                      <span>{blog.readTime}</span>
                    </div>
                  </div>
                )}

                <div className="blog-card-body">
                  <div>
                    <div className="blog-meta">
                      <Calendar size={13} />
                      <span>{blog.date}</span>
                      <span className="blog-dot">&bull;</span>
                      <span>Sanoop Das M</span>
                    </div>

                    <div className="blog-tags-row">
                      {blog.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="blog-tag-badge">
                          <Tag size={10} />
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3>{blog.title}</h3>
                    <p>{blog.summary}</p>
                  </div>

                  <div className="blog-card-actions">
                    <span className="blog-btn-medium-read">
                      Read on Medium <ExternalLink size={14} />
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>

          <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
            <p style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>
              Want to discuss technical architecture or collaborate?{' '}
              <a href="https://medium.com/@sd2b" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--crimson)', fontWeight: 600, textDecoration: 'underline' }}>
                Follow @sd2b on Medium
              </a>{' '}
              or reach out via the contact section below.
            </p>
          </div>
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
