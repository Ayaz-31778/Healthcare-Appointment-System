function doctorUser() {
    return guard("doctor");
}

function renderDoctorAppointments() {

    const box =
        document.getElementById("doctorAppointments");

    if (!box) {
        return;
    }

    const u = doctorUser();

    if (!u) {
        return;
    }

    const d =
        doctors().find(x => x.id === u.doctorId);

    document.getElementById("doctorName").textContent =
        d ? d.name : u.name;

    document.getElementById("doctorSpecialty").textContent =
        d ? d.specialty : "Doctor";

    const list =
        appointments()
            .filter(a => a.doctorId === u.doctorId)
            .reverse();

    document.getElementById("pendingCount").textContent =
        list.filter(
            a => a.status === "Pending"
        ).length;

    document.getElementById("totalCount").textContent =
        list.length;

    document.getElementById("confirmedCount").textContent =
        list.filter(
            a => a.status === "Confirmed"
        ).length;

    box.innerHTML = list.length
        ? list
            .map(a => `
                <article class="appointment-card">

                    <div class="appt-top">

                        <div>

                            <span class="tag">
                                ${a.specialty}
                            </span>

                            <h2>
                                ${a.userName}
                            </h2>

                            <p class="muted">
                                Appointment ID: ${a.id}
                                • Booked: ${a.created}
                            </p>

                        </div>

                        <span class="status status-${a.status}">
                            ${a.status}
                        </span>

                    </div>

                    <div class="appt-details">

                        <span>
                            📅 ${a.date}
                        </span>

                        <span>
                            ⏰ ${a.time}
                        </span>

                        <span>
                            💰 ${money(a.fee)}
                        </span>

                    </div>

                    ${
                        a.status === "Pending"
                            ? `
                                <div class="actions">

                                    <button
                                        class="btn primary small"
                                        onclick="setDoctorStatus('${a.id}', 'Confirmed')">
                                        ✓ Confirm
                                    </button>

                                    <button
                                        class="btn danger small"
                                        onclick="setDoctorStatus('${a.id}', 'Rejected')">
                                        ✕ Reject
                                    </button>

                                </div>
                            `
                            : `
                                <p class="muted">
                                    This appointment has been
                                    ${a.status.toLowerCase()}.
                                </p>
                            `
                    }

                </article>
            `)
            .join("")
        : `
            <div class="panel empty">

                <h2>
                    No appointments yet.
                </h2>

                <p>
                    Patient appointments will appear here.
                </p>

            </div>
        `;
}

function setDoctorStatus(id, status) {

    const a = appointments();

    const x =
        a.find(v => v.id === id);

    if (!x) {
        return;
    }

    if (x.status !== "Pending") {
        return;
    }

    x.status = status;

    set(KEY.appointments, a);

    renderDoctorAppointments();
}

document.addEventListener(
    "DOMContentLoaded",
    renderDoctorAppointments
);