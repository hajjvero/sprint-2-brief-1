import {isEmpty, isEmail} from "./validation/validation.js";

/**
 * Job Listings Application - Starter Code
 * 
 * This is a starter template for building a complete job listings management application.
 * You need to implement the functionality for each function marked with TODO.
 * 
 * Features to implement:
 * - Load and display job listings from data.json
 * - Search and filter functionality
 * - Tab navigation (Profile, Favorites, Manage)
 * - CRUD operations for job management
 * - Favorites system with localStorage
 * - Form validation
 * - Modal dialogs
 * - User profile management
 */

document.addEventListener('DOMContentLoaded', () => {

    // ------------------------------------
    // --- GLOBAL VARIABLES ---
    // ------------------------------------
    
    /** @type {Array} All job listings loaded from data.json */
    let allJobs = [];
    
    /** @type {Array} Currently active manual filters */
    let manualFilters = [];
    
    /** @type {Object} User profile data */
    let userProfile = { name: '', position: '', email: '', skills: [] };
    
    /** @type {Array} Array of favorite job IDs */
    let favoriteJobIds = [];
    
    // LocalStorage keys
    const PROFILE_STORAGE_KEY = 'jobAppUserProfile';
    const FAVORITES_STORAGE_KEY = 'jobAppFavorites';
    const ALL_JOBS_KEY = 'jobAppAllJobs';

    // DOM Elements - Main containers
    const jobListingsContainer = document.getElementById('job-listings-container');
    const filterTagsContainer = document.getElementById('filter-tags-container');
    const clearFiltersBtn = document.getElementById('clear-filters');
    const searchInput = document.getElementById('search-input');
    const statsCounter = document.getElementById('stats-counter');
    const filterBar = document.getElementById('search-input');

    // DOM Elements - Profile
    const profileForm = document.getElementById('profile-form');
    const profileNameInput = document.getElementById('profile-name');
    const profileEmailInput = document.getElementById('profile-email');
    const profilePositionInput = document.getElementById('profile-position');
    const skillInput = document.getElementById('skill-input');
    const profileSkillsList = document.getElementById('profile-skills-list');
    
    // DOM Elements - Tabs
    const tabsNav = document.querySelector('.tabs-nav');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // DOM Elements - Favorites
    const favoriteJobsContainer = document.getElementById('favorite-jobs-container');
    const favoritesCount = document.getElementById('favorites-count');

    // DOM Elements - Job Management
    const manageJobsList = document.getElementById('manage-jobs-list');
    const addNewJobBtn = document.getElementById('add-new-job-btn');

    // DOM Elements - View Modal
    const viewModal = document.getElementById('job-modal');
    const viewModalCloseBtn = document.getElementById('modal-close-btn-view');

    // DOM Elements - Manage Modal
    const manageModal = document.getElementById('manage-job-modal');
    const manageModalCloseBtn = document.getElementById('modal-close-btn-manage');
    const manageModalTitle = document.getElementById('manage-modal-title');
    const manageJobForm = document.getElementById('manage-job-form');
    
    // DOM Elements - Manage Form Fields
    const jobIdInput = document.getElementById('job-id-input');
    const jobCompanyInput = document.getElementById('job-company');
    const jobPositionInput = document.getElementById('job-position');
    const jobLogoInput = document.getElementById('job-logo');
    const jobContractInput = document.getElementById('job-contract');
    const jobLocationInput = document.getElementById('job-location');
    const jobRoleInput = document.getElementById('job-role');
    const jobLevelInput = document.getElementById('job-level');
    const jobSkillsInput = document.getElementById('job-skills');
    const jobDescriptionInput = document.getElementById('job-description');

    // ------------------------------------
    // --- DATA MANAGEMENT ---
    // ------------------------------------

    /**
     * Loads job listings from data.json file
     * If localStorage has saved jobs, use those instead for persistence
     * @async
     * @function loadAllJobs
     * @returns {Promise<void>}
     */
    const loadAllJobs = async () => {
        const  localJobs = localStorage.getItem(ALL_JOBS_KEY);
        if (localJobs) {
            allJobs = JSON.parse(localJobs);
        } else {
            try {
                const response = await fetch('./assets/data/data.json');
                if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
                allJobs = await response.json();
                manualFilters = allJobs;
                saveAllJobs();
            } catch (error) {
                console.error("Error loading data.json:", error);
                jobListingsContainer.innerHTML = '<p class="job-listings__empty">Error loading job data.</p>';
            }
        }
    };

    /**
     * Saves all jobs to localStorage
     * @function saveAllJobs
     */
    const saveAllJobs = () => {
        localStorage.setItem(ALL_JOBS_KEY, JSON.stringify(allJobs));
    };

    // ------------------------------------
    // --- FORM Events ---
    // ------------------------------------

    profileForm.addEventListener("submit", (event) => {
        handleProfileSave(event);
    });

    skillInput.addEventListener("keypress", (e) => {
        handleSkillAdd(e);
    })

    // ------------------------------------
    // --- FORM VALIDATION ---
    // ------------------------------------

    /**
     * Shows error message for a form field
     * @function showError
     * @param {HTMLElement} input - The input element
     * @param {string} message - Error message to display
     */
    const showError = (input, message) => {
        const errorElement = document.createElement('span'); // crete span element
        errorElement.setAttribute("class", "form-error");// add class form-error
        errorElement.setAttribute("aria-live", "polite"); // add attr aria-live
        errorElement.innerText = message; // set text of message
        input.before(errorElement); // append span element after
        input.classList.add("has-error"); // add error class to input
    };

    /**
     * Clears all errors from a form
     * @function clearErrors
     * @param {HTMLElement} form - The form element
     */
    const clearErrors = (form) => {
        const inputs = form.querySelectorAll("input[class='has-error']");
        const errorMessages = form.querySelectorAll("span.form-error");

        inputs.forEach((input) => {
            input.classList.remove('has-error')
        });

        errorMessages.forEach((element) => {
            element.remove();
        })
    };

    /**
     * Validates the profile form
     * @function validateProfileForm
     * @returns {boolean} True if valid, false otherwise
     */
    const validateProfileForm = () => {
        let isValid = true;
        clearErrors(profileForm);

        if (isEmpty(profileNameInput.value)) {
            showError(profileNameInput, "this name filed is require");
            isValid = false;
        }

        if (isEmpty(profileEmailInput.value)) {
            showError(profileEmailInput, "this email filed is require");
            isValid = false;
        }
        else if (!isEmail(profileEmailInput.value)) {
            showError(profileEmailInput, "this email not valid");
            isValid = false;
        }

        if (isEmpty(profilePositionInput.value)) {
            showError(profilePositionInput, "this poste filed is require");
            isValid = false;
        }

        return isValid;
    };

    /**
     * Validates the job management form
     * @function validateJobForm
     * @returns {boolean} True if valid, false otherwise
     */
    const validateJobForm = () => {
        // TODO: Implement job form validation
        // 1. Validate all required fields
        // 2. Validate URL format for logo
        // 3. Show appropriate error messages
        return true;
    };

    // ------------------------------------
    // --- PROFILE MANAGEMENT ---
    // ------------------------------------

    /**
     * Saves user profile to localStorage
     * @function saveProfile
     */
    const saveProfile = () => {
        userProfile.name = profileNameInput.value;
        userProfile.position = profilePositionInput.value;
        userProfile.email = profileEmailInput.value;

        localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(userProfile));
    };

    /**
     * Loads user profile from localStorage
     * @function loadProfile
     */
    const loadProfile = () => {
        let user = JSON.parse(localStorage.getItem(PROFILE_STORAGE_KEY));

        if (user) {
            userProfile = user;
        }
    };

    /**
     * Renders profile skills list
     * @function renderProfileSkills
     */
    const renderProfileSkills = () => {
        profileSkillsList.innerHTML = ""; // empty content of html
        userProfile.skills.map((skill) => {
            profileSkillsList.innerHTML += `<li class="profile-skill-tag" data-skill="${skill}">
                        <span>${skill}</span>
                        <button class="profile-skill-remove" aria-label="Remove skill ${skill}" type="button">✕</button>
                   </li>`;
        });

        let btnRemoveSkill = document.getElementsByClassName("profile-skill-remove");
        for (let btn of btnRemoveSkill) {
            btn.addEventListener("click", (e) => {
                handleSkillRemove(e);
            })
        }
    };

    /**
     * Renders profile form with saved data
     * @function renderProfileForm
     */
    const renderProfileForm = () => {
        profileNameInput.value = userProfile.name;
        profilePositionInput.value = userProfile.position;
        profileEmailInput.value = userProfile.email;
        renderProfileSkills();
    };

    /**
     * Handles profile form submission
     * @function handleProfileSave
     * @param {Event} e - Form submit event
     */
    const handleProfileSave = (e) => {
        e.preventDefault() // stop send form

        // validation
        if (validateProfileForm()) {
            // save info in localStorage.
            saveProfile();
        }
    };

    /**
     * Handles adding new skills
     * @function handleSkillAdd
     * @param {KeyboardEvent} e - Keydown event
     */
    const handleSkillAdd = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const skillValue = e.target.value;
            if (!isEmpty(skillValue)) {
                if (!userProfile.skills.find((skill) => skill === skillValue)) {
                    userProfile.skills.push(skillValue);
                    renderProfileSkills();
                    e.target.value = "";

                    applyAllFilters();
                }
            }
        }
    };

    /**
     * Handles removing skills
     * @function handleSkillRemove
     * @param {Event} e - Click event
     */
    const handleSkillRemove = (e) => {
        const skill = e.target.parentElement.dataset.skill;
        userProfile.skills.splice(userProfile.skills.indexOf(skill), 1);
        e.target.parentElement.remove();
        saveProfile();
        //TODO: update jobs filter
    };

    // ------------------------------------
    // --- FAVORITES MANAGEMENT ---
    // ------------------------------------

    /**
     * Saves favorites to localStorage
     * @function saveFavorites
     */
    const saveFavorites = () => {
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteJobIds));
    };

    /**
     * Loads favorites from localStorage
     * @function loadFavorites
     */
    const loadFavorites = () => {
        const list = localStorage.getItem(FAVORITES_STORAGE_KEY);
        if (list) {
            favoriteJobIds = JSON.parse(list);
        }
        renderFavoriteJobs();
    };

    /**
     * Updates favorites count display
     * @function renderFavoritesCount
     */
    const renderFavoritesCount = () => {
        favoritesCount.innerText = `(${favoriteJobIds.length})`;
    };

    /**
     * Renders favorite jobs in favorites tab
     * @function renderFavoriteJobs
     */
    const renderFavoriteJobs = () => {
        let contentHtml = "";
        if (favoriteJobIds.length === 0) {
            favoriteJobsContainer.innerHTML = '<p class="job-listings__empty">No jobs favorite found.</p>';
        } else {
            for (let i  = 0; i < favoriteJobIds.length; i++) {
                const objectJob = allJobs.find((item) => item.id === favoriteJobIds[i]);
                if (objectJob) {
                    contentHtml += createJobCardHTML(objectJob);
                }
            }

            favoriteJobsContainer.innerHTML = contentHtml;
        }

        renderJobs(allJobs);
        renderFavoritesCount();
        saveFavorites();

        const btnFavorites = document.getElementsByClassName("job-card__favorite-btn");
        for (let i  = 0; i < btnFavorites.length; i++) {
            btnFavorites[i].addEventListener('click', (e) => {
                e.stopPropagation();
                const idJob = Number(e.target.getAttribute("data-job-id"));
                toggleFavorite(idJob);
            })
        }
    };

    /**
     * Toggles job favorite status
     * @function toggleFavorite
     * @param {number} jobId - Job ID to toggle
     */
    const toggleFavorite = (jobId) => {
        // search
        const indexOfJob = favoriteJobIds.indexOf(jobId);

        // find job
        if (indexOfJob !== -1) {
            // Remove job
            favoriteJobIds.splice(indexOfJob,1);
       } else {
            // Add job
            favoriteJobIds.push(jobId);
        }

        renderFavoriteJobs();
    };

    // ------------------------------------
    // --- TAB NAVIGATION ---
    // ------------------------------------

    /**
     * Sets up tab navigation functionality
     * @function setupTabs
     */
    const setupTabs = () => {
        tabsNav.addEventListener('click', (e) => {
            const clickedTab = e.target.closest('.tab-item');
            if (!clickedTab) return;
            
            // Update active tab
            tabsNav.querySelectorAll('.tab-item').forEach(tab => tab.classList.remove('tab-item--active'));
            clickedTab.classList.add('tab-item--active');
            
            // Show/hide tab content
            const tabId = clickedTab.dataset.tab;
            tabContents.forEach(content => {
                content.classList.toggle('tab-content--active', content.id === `tab-${tabId}`);
            });
            
            // Load tab-specific content
            if (tabId === 'favorites') renderFavoriteJobs();
            if (tabId === 'manage') renderManageList();
        });
    };

    // ------------------------------------
    // --- MODAL MANAGEMENT ---
    // ------------------------------------

    /**
     * Opens job details modal
     * @function openViewModal
     * @param {number} jobId - Job ID to display
     */
    const openViewModal = (jobId) => {
        const job = allJobs.find(j => j.id === jobId);
        if (job) {
            document.getElementById('modal-logo').src = job.logo || `https://api.dicebear.com/8.x/initials/svg?seed=${job.company}`;
            document.getElementById('modal-position').textContent = job.position;
            document.getElementById('modal-company').textContent = job.company;
            document.getElementById('modal-description').textContent = job.description;
            document.getElementById('modal-meta').innerHTML = `<li>${job.postedAt}</li><li>${job.contract}</li><li>${job.location}</li>`;
            const tags = [job.role, job.level, ...(job.skills || [])];
            document.getElementById('modal-tags').innerHTML = tags.map(tag => `<span class="job-card__tag">${tag}</span>`).join('');
            viewModal.style.display = 'flex';
        }
    };

    /**
     * Closes job details modal
     * @function closeViewModal
     */
    const closeViewModal = () => {
        viewModal.style.display = 'none';
    };

    /**
     * Opens job management modal (add/edit)
     * @function openManageModal
     * @param {number|null} jobId - Job ID to edit, null for new job
     */
    const openManageModal = (jobId = null) => {
        clearErrors(manageJobForm);
        if (jobId) {
            // Edit mode
            const job = allJobs.find(j => j.id === jobId);
            if (!job) return;
            manageModalTitle.textContent = 'Edit Job';
            jobIdInput.value = job.id;
            jobCompanyInput.value = job.company;
            jobPositionInput.value = job.position;
            jobLogoInput.value = job.logo || '';
            jobContractInput.value = job.contract;
            jobLocationInput.value = job.location;
            jobRoleInput.value = job.role;
            jobLevelInput.value = job.level;
            jobSkillsInput.value = (job.skills || []).join(', ');
            jobDescriptionInput.value = job.description;
        } else {
            // Add mode
            manageModalTitle.textContent = 'Add New Job';
            manageJobForm.reset();
            jobIdInput.value = '';
        }
        manageModal.style.display = 'flex';
    };

    /**
     * Closes job management modal
     * @function closeManageModal
     */
    const closeManageModal = () => {
        manageModal.style.display = 'none';
    };

    // ------------------------------------
    // --- JOB MANAGEMENT (CRUD) ---
    // ------------------------------------

    /**
     * Renders job management list
     * @function renderManageList
     */
    const renderManageList = () => {
        // TODO: Implement manage list rendering
        // Use this HTML template for each job:
        // `<li class="manage-job-item" data-job-id="${job.id}">
        //     <img src="${job.logo}" alt="" class="job-card__logo" style="position: static; width: 48px; height: 48px; border-radius: 5px;">
        //     <div class="manage-job-item__info">
        //         <h4>${job.position}</h4>
        //         <p>${job.company} - ${job.location}</p>
        //     </div>
        //     <div class="manage-job-item__actions">
        //         <button class="btn btn--secondary btn-edit">Edit</button>
        //         <button class="btn btn--danger btn-delete">Delete</button>
        //     </div>
        //  </li>`
    };

    /**
     * Handles job form submission (add/edit)
     * @function handleManageFormSubmit
     * @param {Event} e - Form submit event
     */
    const handleManageFormSubmit = (e) => {
        // TODO: Implement job save logic
        // 1. Prevent default submission
        // 2. Validate form
        // 3. Create job data object
        // 4. Add new job or update existing
        // 5. Save to localStorage
        // 6. Update UI and close modal
    };

    /**
     * Handles manage list clicks (edit/delete)
     * @function handleManageListClick
     * @param {Event} e - Click event
     */
    const handleManageListClick = (e) => {
        // TODO: Implement edit/delete functionality
        // 1. Determine if edit or delete button clicked
        // 2. Get job ID
        // 3. For edit: open manage modal with job data
        // 4. For delete: confirm and remove job
    };

    // ------------------------------------
    // --- JOB RENDERING ---
    // ------------------------------------

    /**
     * Creates HTML for a single job card
     * @function createJobCardHTML
     * @param {Object} job - Job object
     * @returns {string} HTML string for job card
     */
    const createJobCardHTML = (job) => {
        const { id, company, logo, new: isNew, featured, position, role, level, postedAt, contract, location, skills } = job;
        const tags = [role, level, ...(skills || [])];
        const tagsHTML = tags.map(tag => `<span class="job-card__tag" data-tag="${tag}">${tag}</span>`).join('');
        const newBadge = isNew ? '<span class="job-card__badge job-card__badge--new">NEW!</span>' : '';
        const featuredBadge = featured ? '<span class="job-card__badge job-card__badge--featured">FEATURED</span>' : '';
        const featuredClass = featured ? 'job-card--featured' : '';
        
        const isFavorite = favoriteJobIds.includes(id);
        const favoriteClass = isFavorite ? 'job-card__favorite-btn--active' : '';
        const favoriteIcon = isFavorite ? '★' : '☆';

        return `
            <article class="job-card ${featuredClass}" data-job-id="${id}" data-tags="${tags.join(',')}">
                <button class="job-card__favorite-btn ${favoriteClass}" data-job-id="${id}" aria-label="Add to favorites">
                    ${favoriteIcon}
                </button>
                <img src="${logo || `https://api.dicebear.com/8.x/initials/svg?seed=${company}`}" alt="${company} logo" class="job-card__logo">
                <div class="job-card__info">
                    <div class="job-card__company"><span>${company}</span>${newBadge}${featuredBadge}</div>
                    <h2 class="job-card__position">${position}</h2>
                    <ul class="job-card__meta"><li>${postedAt}</li><li>${contract}</li><li>${location}</li></ul>
                </div>
                <div class="job-card__tags">${tagsHTML}</div>
            </article>
        `;
    };

    /**
     * Renders filtered jobs to main container
     * @function renderJobs
     * @param {Array} jobsToRender - Array of job objects to display
     */
    const renderJobs = (jobsToRender) => {
        jobListingsContainer.innerHTML = jobsToRender.length > 0
            ? jobsToRender.map(createJobCardHTML).join('')
            : '<p class="job-listings__empty">No jobs match your search.</p>';

        // event click on article of job
        for (let article of document.getElementsByClassName("job-card")) {
            article.addEventListener("click", (e) => {
                const jobId = article.getAttribute("data-job-id");
                openViewModal(+jobId);
            });
        }
    };

    /**
     * Renders active filter tags
     * @function renderManualFilterTags
     */
    const renderManualFilterTags = () => {
        // TODO: Implement filter tags rendering
        // Use this HTML template for each tag:
        // `<div class="filter-bar__tag" data-tag="${tag}">
        //     <span class="filter-bar__tag-name">${tag}</span>
        //     <button class="filter-bar__tag-remove" aria-label="Remove filter ${tag}">✕</button>
        //  </div>`
    };

    /**
     * Updates statistics counter
     * @function renderStats
     * @param {number} matchCount - Number of matching jobs
     * @param {number} totalCount - Total number of jobs
     */
    const renderStats = (matchCount, totalCount) => {
        statsCounter.innerHTML = `
             <p><span>${matchCount}</span> offers trouvées sur ${totalCount}.</p>
        `;
    };

    // ------------------------------------
    // --- FILTERING & SEARCH ---
    // ------------------------------------

    const resetFilteredJobList = () => {
        manualFilters = [];
        for (let skill of userProfile.skills) {
            for (let job of allJobs) {
                for (let jobSkill of job.skills) {
                    if (jobSkill.toLowerCase().includes(skill.toLowerCase())) {
                        manualFilters.push(job);
                    }
                }
            }
        }
    }
    /**
     * Applies all active filters and updates display
     * @function applyAllFilters
     */
    const applyAllFilters = () => {
        const searchJob = searchInput.value.toLowerCase();
        resetFilteredJobList();

        const searchSkills = (skills) => {
            for (let j = 0; j < skills.length; j++) {
                if (skills[j].toLowerCase().includes(searchJob)) {
                    return true;
                }
            }
            return false;
        };

        for (let i = 0; i < allJobs.length; i++) {
            if (
                allJobs[i].company.toLowerCase().includes(searchJob) ||
                allJobs[i].position.toLowerCase().includes(searchJob) ||
                allJobs[i].location.toLowerCase().includes(searchJob) ||
                allJobs[i].role.toLowerCase().includes(searchJob) ||
                allJobs[i].contract.toLowerCase().includes(searchJob) ||
                searchSkills(allJobs[i].skills)
            ) {
                manualFilters.push(allJobs[i]);
            }
        }

        renderJobs(manualFilters);
        renderStats(manualFilters.length, allJobs.length);
    };

    // ------------------------------------
    // --- EVENT HANDLERS ---
    // ------------------------------------
    clearFiltersBtn.addEventListener("click", function () {
        handleClearFilters();
    })

    /**
     * Handles clicks on job listings
     * @function handleJobListClick
     * @param {Event} e - Click event
     */
    const handleJobListClick = (e) => {
        // TODO: Implement job list click handling
        // 1. Handle tag clicks (add to filters)
        // 2. Handle favorite button clicks
        // 3. Handle card clicks (open modal)
    };

    /**
     * Handles filter bar clicks
     * @function handleFilterBarClick
     * @param {Event} e - Click event
     */
    const handleFilterBarClick = (e) => {
        // TODO: Implement filter removal
        // Handle clicks on filter tag remove buttons
    };

    /**
     * Clears all manual filters
     * @function handleClearFilters
     */
    const handleClearFilters = () => {
        searchInput.value = "";
        applyAllFilters();
    };

    // ------------------------------------
    // --- INITIALIZATION ---
    // ------------------------------------

    /**
     * Initializes the application
     * @async
     * @function initializeApp
     */
    const initializeApp = async () => {
        // TODO: Implement app initialization
        // 1. Load saved data (profile, favorites)
        // 2. Load job data
        // 3. Render initial UI
        // 4. Set up event listeners
        // 5. Apply initial filters

        // Load data
        loadProfile();
        await loadAllJobs();

        // Render initial UI
        renderProfileForm();
        renderProfileSkills();
        renderFavoritesCount();
        setupTabs();
        applyAllFilters();

        // Modal events
        viewModalCloseBtn.addEventListener('click', closeViewModal);
        viewModal.addEventListener('click', (e) => { if (e.target === viewModal) closeViewModal(); });
        manageModalCloseBtn.addEventListener('click', closeManageModal);
        manageModal.addEventListener('click', (e) => { if (e.target === manageModal) closeManageModal(); });
        
        // Management events
        addNewJobBtn.addEventListener('click', () => openManageModal());
        
        // Initial job display
        loadFavorites();
        
        // TODO: Add remaining event listeners
        // Profile events
        // Filter events  
        // Job list events

        searchInput.addEventListener("input", applyAllFilters)
    };

    // Start the application
    initializeApp();
});
