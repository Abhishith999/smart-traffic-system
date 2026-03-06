const junctionData = [
    { name: "Anandapuram Junction", dist: 0 },
    { name: "Boyapalem", dist: 3.2 },
    { name: "Gambheeram", dist: 5.6 },
    { name: "Kommadi Junction", dist: 8.1 },
    { name: "Marikavalasa", dist: 10.5 },
    { name: "PM Palem Last Bus Stop", dist: 12.0 },
    { name: "Yendada / GITAM Down", dist: 15.9 },
    { name: "Zoo Park Junction", dist: 19.8 },
    { name: "RTC Complex", dist: 26.3 }
];

// Populate Dropdowns
const startSelect = document.getElementById('startNode');
const endSelect = document.getElementById('endNode');

junctionData.forEach((j, index) => {
    startSelect.options.add(new Option(j.name, index));
    endSelect.options.add(new Option(j.name, index));
});

function initializeTracking() {
    const start = parseInt(startSelect.value);
    const end = parseInt(endSelect.value);
    
    if (isNaN(start) || isNaN(end) || start >= end) {
        alert("Please select a valid forward route.");
        return;
    }

    renderRoute(start, end);
    // Algorithm 1 & 4: Refresh every 5 seconds [cite: 148, 176]
    if (window.trafficInterval) clearInterval(window.trafficInterval);
    window.trafficInterval = setInterval(() => renderRoute(start, end), 5000);
}

function renderRoute(s, e) {
    const container = document.getElementById('timelineContainer');
    const summary = document.getElementById('travelSummary');
    container.innerHTML = "";
    summary.style.display = "block";

    let cumulativeETA = 0;
    const totalDist = (junctionData[e].dist - junctionData[s].dist).toFixed(1);

    for (let i = s; i <= e; i++) {
        // Algorithm 3: Random Density Simulation [cite: 162]
        const vehicles = Math.floor(Math.random() * 45) + 5;
        const waitTime = (vehicles * 0.15).toFixed(1); // Simulated logic
        cumulativeETA += parseFloat(waitTime);

        const density = vehicles > 30 ? "HIGH" : (vehicles > 15 ? "MODERATE" : "LOW");
        const statusColor = density === "HIGH" ? "#ff4d4d" : (density === "MODERATE" ? "#ffa500" : "#4dff88");

        container.innerHTML += `
            <div class="signal-card" style="border-left: 4px solid ${statusColor}">
                <div class="card-header">
                    <h4>${junctionData[i].name}</h4>
                    <span class="badge" style="background: ${statusColor}22; color: ${statusColor}">${density}</span>
                </div>
                <div class="card-body">
                    <div class="stat">🕒 WAIT TIME <br> <strong>${waitTime} min</strong></div>
                    <div class="stat">🚗 VEHICLES <br> <strong>${vehicles} vol</strong></div>
                </div>
                <p class="advice">${vehicles > 30 ? 'Expect heavy delays.' : 'Smooth flow detected.'}</p>
            </div>
        `;
    }

    document.getElementById('totalMins').innerText = Math.round(cumulativeETA + (totalDist * 1.5));
    document.getElementById('totalDistance').innerText = `Distance: ${totalDist} km`;
    document.getElementById('junctionCount').innerText = `${(e - s) + 1} Junctions`;
}