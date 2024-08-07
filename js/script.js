// toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

// scroll sections
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            // active navbar links
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
            // active sections for animation on scroll
            sec.classList.add('show-animate');
            // add show-animate class to inner animate elements
            sec.querySelectorAll('.animate').forEach(el => {
                el.classList.add('show-animate');
            });
        } else {
            sec.classList.remove('show-animate');
            // remove show-animate class from inner animate elements
            sec.querySelectorAll('.animate').forEach(el => {
                el.classList.remove('show-animate');
            });
        }
    });

    // sticky header
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // remove toggle icon and navbar when click navbar links (scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

    // animation footer on scroll
    let footer = document.querySelector('footer');
    let scrollable = document.documentElement.scrollHeight - window.innerHeight;
    let scrolled = window.scrollY;

    if (Math.ceil(scrolled) === scrollable) {
        footer.classList.add('show-animate');
    }
    else {
        footer.classList.remove('show-animate');
    }
}

// Language toggle functionality
const langToggle = document.getElementById('langToggle');
const langOptions = langToggle.querySelectorAll('.lang-option');

const translations = {
    de: {
        nav: {
            home: "Startseite",
            about: "Profil",
            education: "Bildungsweg",
            skills: "Skills",
            contact: "Kontakt",
            projects: "Projekte",
            project1: "Projekt #1",
            project2: "Projekt #2",
            project3: "Projekt #3"
        },
        hero: {
            greeting: "Hallo, ich bin ",
            role1: "IT-Spezialist",
            role2: "Webdesigner",
            role3: "IT Support-Profi",
            description: "Erfahrener IT-Spezialist mit Schwerpunkt auf First-Level-Support, IT-Unterstützung und Webdesign. Ich suche nach Möglichkeiten, meine Fähigkeiten in technischer Fehlerbehebung, Systemintegration und Kundensupport einzubringen.",
            hireMe: "Kontaktieren",
            myProjects: "Projekte"
        },
        about: {
            title: "Über Mich",
            content: "Als erfahrener IT-Spezialist habe ich meine Fähigkeiten in verschiedenen technischen und Kundensupport-Rollen geschärft. Meine Expertise umfasst Fehlerbehebung, Systemeinrichtung, Netzwerkmanagement und Benutzerschulung. Ich gedeihe in dynamischen Umgebungen und bin stets bereit, neue Herausforderungen anzunehmen.",
            readMore: "Mehr lesen"
        },
        education: {
            title: "Mein Werdegang",
            education: "Bildungsweg",
            experience: "Erfahrung",
            edu1: {
                year: "2022 - 2023",
                degree: "Fachinformatiker für Systemintegration",
                school: "Klinikum Fulda gAG",
                details: "Berufsschule: Ferdinand-Braun-Schule (Fulda, Hessen)"
            },
            edu2: {
                year: "2020 - 2022",
                degree: "Höherer Berufsfachschulabschluss",
                school: "Konrad-Zuse-Schule (Hünfeld, Hessen)",
                details: "Staatlich geprüfter technischer Assistent für Informationsverarbeitung -- Schwerpunkt Technik"
            },
            // Add more education items as needed
            exp1: {
                year: "2023 - Heute",
                position: "IT-Support-Spezialist",
                company: "TechCorp GmbH",
                details: "Bereitstellung von First-Level-Support, Verwaltung von Netzwerksystemen und Unterstützung bei Webentwicklungsprojekten."
            }
            // Add more experience items as needed
        },
        skills: {
            title: "Skills",
            coding: "Programmierkenntnisse",
            professional: "Berufliche Fähigkeiten",
            html: "HTML",
            css: "CSS",
            javascript: "JavaScript",
            python: "Python",
            support: "Technischer Support",
            networking: "Netzwerktechnik",
            webdesign: "Webdesign",
            problemSolving: "Problemlösung"
        },
        contact: {
            title: "Kontaktieren",
            namePlaceholder: "Ihr Name",
            emailPlaceholder: "Ihre E-Mail",
            mobilePlaceholder: "Mobilnummer",
            subjectPlaceholder: "Betreff",
            messagePlaceholder: "Ihre Nachricht",
            sendButton: "Nachricht senden"
        }        
    },
    // English
    en: {
        nav: {
            home: "Home",
            about: "About",
            education: "Education",
            skills: "Skills",
            contact: "Contact",
            projects: "Projects",
            project1: "Project #1",
            project2: "Project #2",
            project3: "Project #3"
        },
        hero: {
            greeting: "Hi, I'm ",
            role1: "IT Specialist",
            role2: "Web Designer",
            role3: "Support Professional",
            description: "Experienced IT specialist with a focus on first-level support, IT assistance, and web design. Seeking opportunities to contribute my skills in technical troubleshooting, system integration, and customer support.",
            hireMe: "Hire Me",
            myProjects: "My Projects"
        },
        about: {
            title: "About Me",
            content: "As a seasoned IT specialist, I have honed my skills in various technical and customer support roles. My expertise includes troubleshooting, system setup, network management, and user training. I thrive in dynamic environments and am always eager to take on new challenges.",
            readMore: "Read More"
        },
        education: {
            title: "My Journey",
            education: "Education",
            experience: "Experience",
            edu1: {
                year: "2022 - 2023",
                degree: "IT Systems Integration Specialist",
                school: "Klinikum Fulda gAG",
                details: "Vocational School: Ferdinand-Braun-Schule (Fulda, Hessen)"
            },
            edu2: {
                year: "2020 - 2022",
                degree: "Higher Vocational Diploma",
                school: "Konrad-Zuse-Schule (Hünfeld, Hessen)",
                details: "State-certified technical assistant for information processing - Focus on technology"
            },
            // Add more education items as needed
            exp1: {
                year: "2023 - Present",
                position: "IT Support Specialist",
                company: "TechCorp GmbH",
                details: "Providing first-level support, managing network systems, and assisting in web development projects."
            }
            // Add more experience items as needed
        },
        skills: {
            title: "My Skills",
            coding: "Coding Skills",
            professional: "Professional Skills",
            html: "HTML",
            css: "CSS",
            javascript: "JavaScript",
            python: "Python",
            support: "Technical Support",
            networking: "Networking",
            webdesign: "Web Design",
            problemSolving: "Problem Solving"
        },
        contact: {
            title: "Contact",
            namePlaceholder: "Your Name",
            emailPlaceholder: "Your Email",
            mobilePlaceholder: "Mobile Number",
            subjectPlaceholder: "Subject",
            messagePlaceholder: "Your Message",
            sendButton: "Send Message"
        }
    }
    
};

// Ensure lang is defined and has a default value
let lang = localStorage.getItem('preferredLanguage') || 'de';

// Function to update content and apply transition
function updateContent(lang) {
    const content = translations[lang];

    // Update content without transition first
    updatePageContent(content);

    // Then apply transition for smooth language change
    if (document.body.classList.contains('loaded')) {
        document.body.classList.add('language-transition');
        setTimeout(() => {
            document.body.classList.remove('language-transition');
        }, 300);
    }
}

// Function to update page content based on the selected language
function updatePageContent(content) {
    // Update navigation
    document.querySelectorAll('.navbar a').forEach(link => {
        const key = link.getAttribute('data-key');
        if (content.nav[key]) {
            link.textContent = content.nav[key];
        }
    });

    // Update dropdown menu
    const dropbtn = document.querySelector('.navbar .dropbtn');
    dropbtn.textContent = content.nav.projects;

    const dropdownLinks = document.querySelectorAll('.navbar .dropdown-content a');
    dropdownLinks[0].textContent = content.nav.project1;
    dropdownLinks[1].textContent = content.nav.project2;
    dropdownLinks[2].textContent = content.nav.project3;

    // Update hero section
    document.querySelector('.home-content h1').innerHTML = `${content.hero.greeting} <span>Rassoul Ebrahimi</span><span class="animate" style="--i:2;"></span>`;
    
    const roles = document.querySelectorAll('.text-animate h3');
    roles[0].textContent = content.hero.role1;
    roles[1].textContent = content.hero.role2;
    roles[2].textContent = content.hero.role3;
    
    document.querySelector('.home-content p').textContent = content.hero.description;
    
    const buttons = document.querySelectorAll('.btn-box .btn');
    buttons[0].textContent = content.hero.hireMe;
    buttons[1].textContent = content.hero.myProjects;

    // Update about section
    document.querySelector('#about .heading').textContent = content.about.title;
    document.querySelector('#about .about-content p').textContent = content.about.content;
    document.querySelector('#about .btn').textContent = content.about.readMore;

    // Update education section
    document.querySelector('#education .heading').textContent = content.education.title;
    document.querySelectorAll('#education .title')[0].textContent = content.education.education;
    document.querySelectorAll('#education .title')[1].textContent = content.education.experience;
    
    // Update education details
    const eduContents = document.querySelectorAll('#education .education-box .education-content');
    eduContents[0].querySelector('.content .year').textContent = content.education.edu1.year;
    eduContents[0].querySelector('.content h3').textContent = content.education.edu1.degree;
    eduContents[0].querySelector('.content p').textContent = content.education.edu1.school + '\n' + content.education.edu1.details;

    eduContents[1].querySelector('.content .year').textContent = content.education.edu2.year;
    eduContents[1].querySelector('.content h3').textContent = content.education.edu2.degree;
    eduContents[1].querySelector('.content p').textContent = content.education.edu2.school + '\n' + content.education.edu2.details;

    // Update experience details
    const expContents = document.querySelectorAll('#education .education-box:nth-child(2) .education-content');
    expContents[0].querySelector('.content .year').textContent = content.education.exp1.year;
    expContents[0].querySelector('.content h3').textContent = content.education.exp1.position;
    expContents[0].querySelector('.content p').textContent = content.education.exp1.company + '\n' + content.education.exp1.details;

    // Update skills section
    document.querySelector('#skills .heading').textContent = content.skills.title;
    document.querySelectorAll('#skills .title')[0].textContent = content.skills.coding;
    document.querySelectorAll('#skills .title')[1].textContent = content.skills.professional;
    
    // Update skill names
    const skillNames = document.querySelectorAll('#skills .skills-content .progress h3');
    skillNames[0].textContent = content.skills.html;
    skillNames[1].textContent = content.skills.css;
    skillNames[2].textContent = content.skills.javascript;
    skillNames[3].textContent = content.skills.python;
    skillNames[4].textContent = content.skills.support;
    skillNames[5].textContent = content.skills.networking;
    skillNames[6].textContent = content.skills.webdesign;
    skillNames[7].textContent = content.skills.problemSolving;
    
    // Update contact section
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
        const heading = contactSection.querySelector('.heading');
        if (heading) {
            heading.innerHTML = `${content.contact.title} <span>Sie mich!</span>`;
        }

        const submitButton = contactSection.querySelector('.btn-box .btn');
        if (submitButton) {
            submitButton.textContent = content.contact.sendButton;
        }

        const inputs = contactSection.querySelectorAll('.input-field input');
        if (inputs.length >= 4) {
            inputs[0].placeholder = content.contact.namePlaceholder;
            inputs[1].placeholder = content.contact.emailPlaceholder;
            inputs[2].placeholder = content.contact.mobilePlaceholder;
            inputs[3].placeholder = content.contact.subjectPlaceholder;
        }

        const textarea = contactSection.querySelector('textarea');
        if (textarea) {
            textarea.placeholder = content.contact.messagePlaceholder;
        }
    }

    // Update document language
    document.documentElement.lang = lang;

    console.log(`Switched to ${lang}`);
}

// Set initial language when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
        lang = savedLang;
        updateContent(lang);
    }

    // Add show-animate class to animate elements
    document.querySelectorAll('.animate').forEach(element => {
        element.classList.add('show-animate');
    });

    // Mark the body as loaded after a short delay
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

langToggle.addEventListener('click', () => {
    langOptions.forEach(option => {
        option.classList.toggle('active');
    });

    const activeLangOption = langToggle.querySelector('.active');
    if (activeLangOption) {
        const activeLang = activeLangOption.dataset.lang;
        lang = activeLang;
        updateContent(lang);
        localStorage.setItem('preferredLanguage', lang);
    }
});

// Ensure keyboard accessibility
langToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        langToggle.click();
    }
});
