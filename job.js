const jobContainer = document.getElementById("job-container");
const pageNum = document.getElementById("page-num");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const jobsPerPage = 12;
let currentPage = 1;

// Dummy Data for 30 Jobs with Apply Links
const jobs = [
    { title: "𝗔𝗰𝗰𝗲𝗻𝘁𝘂𝗿𝗲 𝗛𝗶𝗿𝗶𝗻𝗴 𝗣𝗿𝗼𝗴𝗿𝗮𝗺 𝟮𝟬𝟮𝟱😍", desc: "QUALIFICATION :Any Graduation", logo: "/images/jo/ac.jpg", applyLink: "https://pdlink.in/4b7JOpF" },
    { title: "𝗖𝗚𝗜 𝗶𝘀 𝗵𝗶𝗿𝗶𝗻𝗴  😍", desc: " Software Engineer  SAP HCM/Payroll Consultant.", logo: "/images/jo/24.jpg", applyLink: "https://pdlink.in/3EGzc4O" },
    { title: "C𝗹𝗮𝗿𝗶𝘃𝗮𝘁𝗲 𝗪𝗼𝗿𝗸 𝗙𝗿𝗼𝗺 𝗛𝗼𝗺𝗲(𝗛𝘆𝗯𝗿𝗶𝗱)", desc: "Associate Healthcare Research & Data Analys.", logo: "/images/jo/88.jpg", applyLink: "https://pdlink.in/4131IFw" },
    { title: "𝗩𝗜𝗦𝗔 𝗪𝗼𝗿𝗸 𝗙𝗿𝗼𝗺 𝗛𝗼𝗺𝗲", desc: "SE Bachelors (B.E/B.Tech OR M.E/M.Tech", logo: "/images/jo/44.jpg", applyLink: "https://pdlink.in/4gMuEHm"},
    { title:"𝗕𝘂𝘀𝗶𝗻𝗲𝘀𝘀 & 𝗗𝗮𝘁𝗮 𝗔𝗻𝗮𝗹𝘆𝘁𝗶𝗰𝘀", desc: "Data Analyst.", logo: "/images/jo/87.jpg", applyLink: "https://pdlink.in/3QmR1sf" },
    { title: "𝗢𝗿𝗮𝗰𝗹𝗲 𝗶𝘀 𝗛𝗶𝗿𝗶𝗻𝗴", desc: "Graduation.", logo: "/images/jo/26.jpg", applyLink: "https://pdlink.in/4jZRUEN" },
    { title: "𝗣𝗵𝗼𝗻𝗲𝗣𝗲 ", desc: "Integration Engineer -any Graduate.", logo: "/images/jo/78.jpg", applyLink: "https://pdlink.in/3X6tmjF" },
    { title: "𝗙𝗶𝗻𝗮𝗻𝗰𝗲 𝗝𝗼𝗯 𝗢𝗽𝗲𝗻𝗶𝗻𝗴𝘀 𝗔𝘁 𝗖𝗶𝘁𝗶 ", desc: "Bachelor’s degree.", logo: "/images/jo/91.jpg", applyLink: "https://pdlink.in/3D7cBhn" },
    { title: "𝗚𝗼𝗼𝗴𝗹𝗲 𝗶𝘀 𝗛𝗶𝗿𝗶𝗻𝗴 ", desc: " Software Engineer YouTube", logo: "/images/jo/19.jpg", applyLink: "https://pdlink.in/4hFLeKu" },
    { title: "𝗤𝘂𝗮𝗹𝗰𝗼𝗺𝗺 ", desc: "BTech/BE/Masters in CS, Electronics.", logo: "/images/jo/59.jpg", applyLink: "https://pdlink.in/41iwICw" },
    { title: "𝗪𝗶𝗽𝗿𝗼'𝘀 𝗧𝘂𝗿𝗯𝗼", desc: "B.E/B.Tech (Streams: CS/IT/Circuital", logo: "/images/jo/90.jpg", applyLink: "https://pdlink.in/4hVWAcQ" },
    { title: "𝗚𝗲𝗻𝗽𝗮𝗰𝘁 ", desc: "Lead Consultant Python Developer .", logo: "/images/jo/34.jpg", applyLink: "https://pdlink.in/4hWwdnc" },
    { title:"𝗜𝗕𝗠", desc: " FrontEnd Developer.", logo: "/images/jo/92.jpg", applyLink: "https://pdlink.in/3QltTud" },
    { title: "𝗗𝗲𝗹𝗼𝗶𝘁𝘁𝗲 𝗩𝗶𝗿𝘁𝘂𝗮𝗹 𝗜𝗻𝘁𝗲𝗿𝗻𝘀𝗵𝗶𝗽 ", desc: " No experience required", logo: "/images/jo/54.jpg", applyLink: "https://pdlink.in/3WWMNLx" },
    { title: "𝐌𝐢𝐜𝐫𝐨𝐬𝐨𝐟𝐭 𝐃𝐚𝐭𝐚 𝐒𝐜𝐢𝐞𝐧𝐜𝐞 𝐈𝐧𝐭𝐞𝐫𝐧𝐬𝐡𝐢𝐩 𝟐𝟎𝟐𝟓", desc: "Data Science Intern colege stud", logo: "/images/jo/27.jpg", applyLink: "https://pdlink.in/4k38VxO" },
    { title: "𝗔𝗱𝗼𝗯𝗲", desc: "Software Development Engineer", logo: "/images/jo/37.jpg", applyLink: "https://pdlink.in/4hXCbEs" },
    { title: "𝗠𝗮𝗰𝗵𝗶𝗻𝗲 𝗟𝗲𝗮𝗿𝗻𝗶𝗻𝗴 𝗝𝗼𝗯 𝗢𝗽𝗲𝗻𝗶𝗻𝗴𝘀 ", desc: "Work with machine learning models.", logo: "/images/jo/42.jpg", applyLink: "https://pdlink.in/3QiQTdk" },
    { title: "𝗪𝗼𝗿𝗸 𝗙𝗿𝗼𝗺 𝗛𝗼𝗺𝗲 (𝗛𝘆𝗯𝗿𝗶𝗱)", desc: "Degree in CS, IS.", logo: "/images/jo/73.jpg", applyLink: "https://pdlink.in/4k0tJGg" },
    { title: "𝗥𝗮𝘇𝗼𝗿𝗽𝗮𝘆 ", desc: "Bachelor’s/Master’s degree", logo: "/images/jo/84.jpg", applyLink: "https://pdlink.in/40X8lJn" },
    { title: "𝗥𝗲𝗱 𝗛𝗮𝘁", desc: "Graduation.", logo: "/images/jo/25.jpg", applyLink: "https://pdlink.in/42Seb1h" }

];

// Function to render jobs based on page
function renderJobs() {
    jobContainer.innerHTML = "";
    let start = (currentPage - 1) * jobsPerPage;
    let end = start + jobsPerPage;
    let paginatedJobs = jobs.slice(start, end);

    paginatedJobs.forEach(job => {
        let jobBox = document.createElement("div");
        jobBox.classList.add("job-box");
        jobBox.innerHTML = `
            <div class="logo-container">
                <img src="${job.logo}" alt="Company Logo" class="company-logo">
            </div>
            <div class="job-details">
                <h2>${job.title}</h2>
                <p>${job.desc}</p>
            </div>
            <a href="${job.applyLink}" target="_blank" class="apply-button">Apply Now</a>
        `;
        jobContainer.appendChild(jobBox);
    });

    pageNum.textContent = `Page ${currentPage}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === Math.ceil(jobs.length / jobsPerPage);
}

prevBtn.addEventListener("click", () => { currentPage--; renderJobs(); });
nextBtn.addEventListener("click", () => { currentPage++; renderJobs(); });

renderJobs();