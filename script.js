document.addEventListener("DOMContentLoaded", () => {

    const grid = document.getElementById("grid");
    const progressText = document.getElementById("progress-text");
    const progressFill = document.getElementById("progress-fill");
    const creditsText = document.getElementById("credits-text");


    // =========================================================
    // CLAVE LOCALSTORAGE MECÁNICA VESPERTINA
    // =========================================================

    const STORAGE_KEY = "approvedCourses_MECANICAVESP";


    // =========================================================
    // CARGAR RAMOS APROBADOS DESDE LOCALSTORAGE
    // =========================================================

    let approved = [];

    try {
        approved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (e) {
        approved = [];
    }


    // =========================================================
    // LISTA COMPLETA DE RAMOS
    // =========================================================

    const allCourses = [];
    const courseMap = {};

    for (let sem in semesters) {

        semesters[sem].forEach(course => {

            allCourses.push(course.code);
            courseMap[course.code] = course;

        });

    }


    // =========================================================
    // LIMPIEZA AUTOMÁTICA
    // =========================================================

    approved = approved.filter(code => allCourses.includes(code));

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(approved)
    );


    // =========================================================
    // VALIDAR PRERREQUISITOS
    // =========================================================

    function isUnlocked(course) {

        if (!course.prereq || course.prereq.length === 0) {
            return true;
        }

        return course.prereq.every(
            req => approved.includes(req)
        );

    }


    // =========================================================
    // DESAPROBACIÓN EN CASCADA
    // =========================================================

    function removeWithDependents(code) {

        const toRemove = new Set();

        toRemove.add(code);

        let changed = true;

        while (changed) {

            changed = false;

            approved.forEach(c => {

                const prereq =
                    courseMap[c]?.prereq || [];

                if (
                    prereq.some(
                        p => toRemove.has(p)
                    )
                    &&
                    !toRemove.has(c)
                ) {

                    toRemove.add(c);

                    changed = true;

                }

            });

        }

        approved = approved.filter(
            c => !toRemove.has(c)
        );

    }


    // =========================================================
    // CALCULAR CRÉDITOS APROBADOS
    // =========================================================

    function calculateApprovedCredits() {

        let total = 0;

        for (let sem in semesters) {

            semesters[sem].forEach(course => {

                if (approved.includes(course.code)) {

                    total += Number(course.credits) || 0;

                }

            });

        }

        return total;

    }


    // =========================================================
    // CALCULAR CRÉDITOS TOTALES
    // =========================================================

    function calculateTotalCredits() {

        let total = 0;

        for (let sem in semesters) {

            semesters[sem].forEach(course => {

                total += Number(course.credits) || 0;

            });

        }

        return total;

    }


    // =========================================================
    // ACTUALIZAR PROGRESO
    // =========================================================

    function updateProgress() {

        const approvedCredits =
            calculateApprovedCredits();

        const totalCredits =
            calculateTotalCredits();

        const approvedCourses =
            approved.length;

        const totalCourses =
            allCourses.length;

        const percent =
            totalCredits === 0
                ? 0
                : (
                    (approvedCredits / totalCredits)
                    * 100
                ).toFixed(1);


        progressFill.style.width =
            percent + "%";

        progressText.textContent =
            `Progreso: ${percent}%`;

        creditsText.innerHTML = `
            Créditos aprobados: ${approvedCredits} / ${totalCredits}<br>
            Ramos aprobados: ${approvedCourses} / ${totalCourses}
        `;

    }


    // =========================================================
    // RENDER PRINCIPAL
    // =========================================================

    function render() {

        grid.innerHTML = "";


        // =====================================================
        // SEMESTRES
        // =====================================================

        for (
            let sem = 1;
            sem <= 6;
            sem++
        ) {

            if (!semesters[sem]) {
                continue;
            }


            const semDiv =
                document.createElement("div");

            semDiv.className =
                "semester";


            // =================================================
            // TÍTULO DEL SEMESTRE
            // =================================================

            const title =
                document.createElement("h2");

            title.textContent =
                `S${sem}`;

            title.classList.add(
                "semester-title"
            );


            // =================================================
            // CLICK EN EL SEMESTRE
            // =================================================

            title.addEventListener(
                "click",
                () => {

                    const courses =
                        semesters[sem];


                    const availableCourses =
                        courses.filter(course => {

                            return (
                                isUnlocked(course)
                                &&
                                !approved.includes(
                                    course.code
                                )
                            );

                        });


                    // =========================================
                    // SI HAY RAMOS DESBLOQUEADOS
                    // =========================================

                    if (
                        availableCourses.length > 0
                    ) {

                        availableCourses.forEach(
                            course => {

                                if (
                                    !approved.includes(
                                        course.code
                                    )
                                ) {

                                    approved.push(
                                        course.code
                                    );

                                }

                            }
                        );

                    }


                    // =========================================
                    // SI YA ESTÁN TODOS APROBADOS
                    // =========================================

                    else {

                        courses.forEach(
                            course => {

                                if (
                                    approved.includes(
                                        course.code
                                    )
                                ) {

                                    removeWithDependents(
                                        course.code
                                    );

                                }

                            }
                        );

                    }


                    localStorage.setItem(
                        STORAGE_KEY,
                        JSON.stringify(
                            approved
                        )
                    );


                    render();

                }
            );


            semDiv.appendChild(title);


            // =================================================
            // RAMOS DEL SEMESTRE
            // =================================================

            semesters[sem].forEach(
                course => {

                    const div =
                        document.createElement(
                            "div"
                        );

                    div.classList.add(
                        "course"
                    );


                    // =========================================
                    // COLORES SEGÚN SIGLA
                    // =========================================

                    if (
                        course.code.startsWith(
                            "MAT"
                        )
                    ) {

                        div.classList.add(
                            "mat"
                        );

                    }


                    if (
                        course.code.startsWith(
                            "ICM"
                        )
                    ) {

                        div.classList.add(
                            "icm"
                        );

                    }


                    if (
                        course.code.startsWith(
                            "ING"
                        )
                    ) {

                        div.classList.add(
                            "ing"
                        );

                    }


                    if (
                        course.code.startsWith(
                            "IER"
                        )
                        ||
                        course.code.startsWith(
                            "FOFU"
                        )
                    ) {

                        div.classList.add(
                            "rosado"
                        );

                    }


                    if (
                        course.code.startsWith(
                            "OPT"
                        )
                    ) {

                        div.classList.add(
                            "opt"
                        );

                    }


                    // =========================================
                    // CONTENIDO DEL RAMO
                    // =========================================

                    div.innerHTML = `
                        <strong>${course.code}</strong><br>
                        ${course.name}<br>
                        <small>${course.credits} créditos</small>
                    `;


                    // =========================================
                    // ESTADO DEL RAMO
                    // =========================================

                    const unlocked =
                        isUnlocked(course);


                    if (
                        approved.includes(
                            course.code
                        )
                    ) {

                        div.classList.add(
                            "approved"
                        );

                    }

                    else if (unlocked) {

                        div.classList.add(
                            "available"
                        );

                    }

                    else {

                        div.classList.add(
                            "locked"
                        );

                    }


                    // =================================================
                    // FLECHA DE PRERREQUISITOS
                    // =================================================

                    if (
                        course.prereq
                        &&
                        course.prereq.length > 0
                    ) {

                        const prereqButton =
                            document.createElement(
                                "button"
                            );

                        prereqButton.className =
                            "prereq-button";

                        prereqButton.textContent =
                            "▼";

                        prereqButton.type =
                            "button";


                        const prereqContainer =
                            document.createElement(
                                "div"
                            );

                        prereqContainer.className =
                            "prereq-container";

                        prereqContainer.style.display =
                            "none";


                        const prereqTitle =
                            document.createElement(
                                "div"
                            );

                        prereqTitle.className =
                            "prereq-title";

                        prereqTitle.textContent =
                            "Prerrequisitos:";


                        prereqContainer.appendChild(
                            prereqTitle
                        );


                        // =============================================
                        // MOSTRAR CADA PRERREQUISITO
                        // =============================================

                        course.prereq.forEach(
                            req => {

                                const prereqCourse =
                                    courseMap[req];


                                const prereqItem =
                                    document.createElement(
                                        "div"
                                    );

                                prereqItem.className =
                                    "prereq-item";


                                const prereqName =
                                    prereqCourse
                                        ? `${req} - ${prereqCourse.name}`
                                        : req;


                                prereqItem.textContent =
                                    prereqName;


                                // =====================================
                                // COLOR DEL PRERREQUISITO
                                // =====================================

                                if (
                                    approved.includes(
                                        req
                                    )
                                ) {

                                    prereqItem.classList.add(
                                        "prereq-approved"
                                    );

                                }

                                else {

                                    prereqItem.classList.add(
                                        "prereq-not-approved"
                                    );

                                }


                                prereqContainer.appendChild(
                                    prereqItem
                                );

                            }
                        );


                        // =============================================
                        // ABRIR / CERRAR PRERREQUISITOS
                        // =============================================

                        prereqButton.addEventListener(
                            "click",
                            event => {

                                event.stopPropagation();


                                const abierto =
                                    prereqContainer.style.display
                                    === "block";


                                if (abierto) {

                                    prereqContainer.style.display =
                                        "none";

                                    prereqButton.textContent =
                                        "▼";

                                }

                                else {

                                    prereqContainer.style.display =
                                        "block";

                                    prereqButton.textContent =
                                        "▲";

                                }

                            }
                        );


                        div.appendChild(
                            prereqButton
                        );

                        div.appendChild(
                            prereqContainer
                        );

                    }


                    // =================================================
                    // CLICK PARA APROBAR / DESAPROBAR
                    // =================================================

                    if (
                        unlocked
                        ||
                        approved.includes(
                            course.code
                        )
                    ) {

                        div.addEventListener(
                            "click",
                            () => {

                                if (
                                    approved.includes(
                                        course.code
                                    )
                                ) {

                                    removeWithDependents(
                                        course.code
                                    );

                                }

                                else {

                                    approved.push(
                                        course.code
                                    );

                                }


                                localStorage.setItem(
                                    STORAGE_KEY,
                                    JSON.stringify(
                                        approved
                                    )
                                );


                                render();

                            }
                        );

                    }


                    semDiv.appendChild(
                        div
                    );

                }
            );


            grid.appendChild(
                semDiv
            );

        }


        // =====================================================
        // ACTUALIZAR PROGRESO
        // =====================================================

        updateProgress();

    }


    // =========================================================
    // INICIAR MALLA
    // =========================================================

    render();

});
