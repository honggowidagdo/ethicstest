/* =========================================================
   Deontolog atau Utilitarian? — 17 layar
   Layar 0  : input nama
   Layar 1-15: pertanyaan (1 klik = lanjut)
   Layar 16 : hasil
   Skor: positif = Utilitarian, negatif = Deontolog
   ========================================================= */

const QUESTIONS = [
  {
    tag: "Dilema Troli",
    scenario: "Sebuah troli melaju tak terkendali menuju 5 pekerja di rel. Kamu berdiri di dekat tuas yang bisa membelokkan troli ke rel lain — tapi di sana ada 1 pekerja.",
    q: "Apakah kamu menarik tuas itu?",
    options: [
      { t: "Ya, tanpa ragu. Satu nyawa lebih sedikit dari lima.", s: 2 },
      { t: "Tidak. Aku tidak mau menjadi penyebab langsung kematian seseorang.", s: -2 },
      { t: "Mungkin ya, walau berat hati.", s: 1 },
      { t: "Cenderung tidak — membiarkan berbeda dengan membunuh.", s: -1 },
    ],
  },
  {
    tag: "Jembatan",
    scenario: "Troli yang sama menuju 5 orang. Kali ini kamu berada di atas jembatan, di samping seorang pria bertubuh besar. Mendorongnya jatuh ke rel akan menghentikan troli.",
    q: "Apakah kamu mendorongnya?",
    options: [
      { t: "Tidak. Memperalat manusia sebagai alat itu salah.", s: -2 },
      { t: "Ya. Hasilnya sama: 1 mati, 5 selamat.", s: 2 },
      { t: "Sepertinya tidak, rasanya terlalu salah.", s: -1 },
      { t: "Mungkin ya, kalau benar-benar pasti berhasil.", s: 1 },
    ],
  },
  {
    tag: "Kebohongan",
    scenario: "Temanmu bersembunyi di rumahmu. Seorang pembunuh datang mengetuk pintu dan bertanya di mana temanmu berada.",
    q: "Bolehkah kamu berbohong?",
    options: [
      { t: "Tentu saja boleh — menyelamatkan nyawa jauh lebih penting.", s: 2 },
      { t: "Boleh, tapi tetap ada yang salah dari berbohong.", s: 1 },
      { t: "Aku lebih memilih diam atau mengelak tanpa berbohong.", s: -1 },
      { t: "Tidak. Berbohong tetap salah, apa pun situasinya.", s: -2 },
    ],
  },
  {
    tag: "Ruang Operasi",
    scenario: "Seorang dokter punya 5 pasien yang sekarat karena butuh organ berbeda. Seorang pasien sehat datang untuk check-up rutin dan organnya cocok untuk kelimanya.",
    q: "Bolehkah dokter mengambil organ pasien sehat itu?",
    options: [
      { t: "Sama sekali tidak. Itu pembunuhan.", s: -2 },
      { t: "Secara hitungan masuk akal, tapi akan merusak kepercayaan pada dokter.", s: 0.5 },
      { t: "Ya, bila bisa dirahasiakan — lima nyawa lebih berharga.", s: 2 },
      { t: "Tidak, meskipun aku paham logikanya.", s: -1 },
    ],
  },
  {
    tag: "Janji",
    scenario: "Kamu berjanji kepada sahabat yang sedang sekarat untuk memberikan uang warisannya kepada anaknya. Belakangan kamu tahu uang itu bisa menyelamatkan ratusan anak miskin jika disumbangkan.",
    q: "Apa yang kamu lakukan?",
    options: [
      { t: "Menepati janji. Janji adalah kewajiban moral.", s: -2 },
      { t: "Menyumbangkan uangnya. Dampaknya jauh lebih besar.", s: 2 },
      { t: "Mungkin menepati janji, tapi dengan rasa bersalah.", s: -1 },
      { t: "Mungkin menyumbang sebagian besar.", s: 1 },
    ],
  },
  {
    tag: "Bom Waktu",
    scenario: "Seorang teroris yang tertangkap mengetahui lokasi bom yang akan meledak dalam satu jam dan membunuh ribuan orang. Ia menolak bicara.",
    q: "Apakah penyiksaan dibenarkan untuk mendapatkan informasinya?",
    options: [
      { t: "Ya. Ribuan nyawa dipertaruhkan.", s: 2 },
      { t: "Mungkin, dalam kondisi yang benar-benar darurat.", s: 1 },
      { t: "Ragu — penyiksaan merendahkan martabat siapa pun.", s: -1 },
      { t: "Tidak. Penyiksaan selalu salah secara mutlak.", s: -2 },
    ],
  },
  {
    tag: "Obat",
    scenario: "Istri seorang pria sekarat. Satu-satunya obat dijual dengan harga yang mustahil ia bayar, dan apoteker menolak memberi keringanan.",
    q: "Bolehkah pria itu mencuri obat tersebut?",
    options: [
      { t: "Boleh. Nyawa istrinya jauh lebih penting dari kerugian apoteker.", s: 2 },
      { t: "Tidak. Mencuri tetap melanggar hak orang lain.", s: -2 },
      { t: "Bisa dimaklumi, tapi tetap bukan hal yang benar.", s: -0.5 },
      { t: "Boleh, asal ia siap menanggung akibatnya.", s: 1 },
    ],
  },
  {
    tag: "Prinsip",
    scenario: "Pertimbangkan pernyataan berikut:",
    q: "“Tindakan yang benar adalah yang menghasilkan kebahagiaan terbesar bagi sebanyak mungkin orang.”",
    options: [
      { t: "Sangat setuju", s: 2 },
      { t: "Agak setuju", s: 1 },
      { t: "Agak tidak setuju", s: -1 },
      { t: "Sangat tidak setuju", s: -2 },
    ],
  },
  {
    tag: "Kado",
    scenario: "Nenekmu merajut syal untukmu dengan susah payah. Kamu sama sekali tidak suka modelnya. Ia bertanya, “Kamu suka?”",
    q: "Apa jawabanmu?",
    options: [
      { t: "“Suka sekali, Nek!” — kebahagiaannya yang terpenting.", s: 2 },
      { t: "Jujur dengan halus — aku tidak mau berbohong.", s: -1 },
      { t: "Bohong kecil tidak apa-apa, toh tak merugikan siapa pun.", s: 1 },
      { t: "Tetap jujur. Kebohongan kecil pun tetap kebohongan.", s: -2 },
    ],
  },
  {
    tag: "Kerusuhan",
    scenario: "Sebuah kota di ambang kerusuhan besar yang bisa menewaskan puluhan orang. Massa menuntut pelaku kejahatan ditangkap. Seorang hakim bisa menghukum orang tak bersalah untuk meredakan massa.",
    q: "Haruskah hakim melakukannya?",
    options: [
      { t: "Tidak. Menghukum orang tak bersalah adalah ketidakadilan mutlak.", s: -2 },
      { t: "Cenderung tidak, keadilan harus dijaga.", s: -1 },
      { t: "Mungkin, jika itu satu-satunya cara.", s: 1 },
      { t: "Ya. Satu korban lebih baik daripada puluhan.", s: 2 },
    ],
  },
  {
    tag: "Sahabat",
    scenario: "Sahabatmu menggelapkan uang dari perusahaan kecil. Jumlahnya cukup untuk membuat beberapa karyawan dipecat jika tidak ketahuan.",
    q: "Apa yang kamu lakukan?",
    options: [
      { t: "Melapor — karena mencuri itu salah, siapa pun pelakunya.", s: -1.5 },
      { t: "Melapor — karena dampaknya merugikan banyak karyawan.", s: 1.5 },
      { t: "Diam, kesetiaan pada sahabat adalah kewajibanku.", s: -1 },
      { t: "Memaksanya mengembalikan uang diam-diam — hasil terbaik untuk semua.", s: 1 },
    ],
  },
  {
    tag: "Kebebasan",
    scenario: "Saat pandemi mematikan, pemerintah ingin mewajibkan karantina ketat yang membatasi kebebasan individu, tapi diperkirakan menyelamatkan ribuan nyawa.",
    q: "Bagaimana pendapatmu?",
    options: [
      { t: "Setuju sepenuhnya, keselamatan bersama di atas segalanya.", s: 2 },
      { t: "Setuju, tapi dengan batasan yang jelas.", s: 1 },
      { t: "Ragu — hak individu tidak boleh dikorbankan begitu saja.", s: -1 },
      { t: "Tidak setuju. Kebebasan dasar tidak boleh dilanggar.", s: -2 },
    ],
  },
  {
    tag: "Donasi",
    scenario: "Kamu hendak membeli ponsel baru seharga Rp10 juta. Uang yang sama bisa menyelamatkan beberapa anak dari penyakit mematikan melalui lembaga amal.",
    q: "Apakah kamu wajib menyumbangkannya?",
    options: [
      { t: "Tidak wajib — itu uangku, berderma itu pilihan mulia, bukan kewajiban.", s: -2 },
      { t: "Ya, secara moral aku wajib. Nyawa lebih penting dari ponsel.", s: 2 },
      { t: "Sebaiknya menyumbang, tapi tidak wajib.", s: -0.5 },
      { t: "Cenderung wajib, setidaknya sebagian besar.", s: 1 },
    ],
  },
  {
    tag: "Mobil Otonom",
    scenario: "Kamu memprogram mobil tanpa sopir. Dalam kecelakaan tak terhindarkan, mobil bisa banting setir menabrak tembok (penumpang tewas) atau terus melaju (5 pejalan kaki tewas).",
    q: "Bagaimana kamu memprogramnya?",
    options: [
      { t: "Banting setir — minimalkan jumlah korban.", s: 2 },
      { t: "Jangan sengaja mengarahkan mobil untuk membunuh siapa pun.", s: -2 },
      { t: "Cenderung banting setir.", s: 1 },
      { t: "Cenderung melindungi penumpang yang memercayai mobil itu.", s: -1 },
    ],
  },
  {
    tag: "Prinsip",
    scenario: "Pertimbangkan pernyataan berikut:",
    q: "“Ada tindakan yang selalu salah, tidak peduli seberapa baik konsekuensinya.”",
    options: [
      { t: "Sangat setuju", s: -2 },
      { t: "Agak setuju", s: -1 },
      { t: "Agak tidak setuju", s: 1 },
      { t: "Sangat tidak setuju", s: 2 },
    ],
  },
];

const TOTAL_SCREENS = QUESTIONS.length + 2; // 17
const KEYS = ["A", "B", "C", "D"];

const state = {
  screen: 0,
  name: "",
  answers: new Array(QUESTIONS.length).fill(null), // index opsi yang dipilih
  busy: false,
};

const app = document.getElementById("app");
const topbar = document.getElementById("topbar");
const backBtn = document.getElementById("backBtn");
const progressFill = document.getElementById("progressFill");
const stepLabel = document.getElementById("stepLabel");

/* ---------------- Navigasi ---------------- */
function go(to, dir = 1) {
  if (state.busy) return;
  state.busy = true;
  const current = app.querySelector(".screen");
  if (current) {
    current.classList.add(dir > 0 ? "leaving" : "leaving-back");
    setTimeout(() => {
      state.screen = to;
      render(dir);
      state.busy = false;
    }, 260);
  } else {
    state.screen = to;
    render(dir);
    state.busy = false;
  }
}

backBtn.addEventListener("click", () => {
  if (state.screen > 0) go(state.screen - 1, -1);
});

function updateTopbar() {
  const s = state.screen;
  progressFill.style.width = `${(s / (TOTAL_SCREENS - 1)) * 100}%`;
  stepLabel.textContent = `${s + 1} / ${TOTAL_SCREENS}`;
  backBtn.disabled = s === 0;
  topbar.classList.toggle("hidden", s === TOTAL_SCREENS - 1);
}

function render(dir = 1) {
  updateTopbar();
  const s = state.screen;
  let el;
  if (s === 0) el = renderName();
  else if (s <= QUESTIONS.length) el = renderQuestion(s - 1);
  else el = renderResult();
  if (dir < 0) el.classList.add("enter-back");
  app.innerHTML = "";
  app.appendChild(el);
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (s === TOTAL_SCREENS - 1) requestAnimationFrame(() => setTimeout(animateResult, 120));
}

function screenEl(html) {
  const div = document.createElement("section");
  div.className = "screen";
  div.innerHTML = html;
  return div;
}

const esc = (str) =>
  str.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ---------------- Layar 1: Nama ---------------- */
function renderName() {
  const el = screenEl(`
    <div class="card">
      <span class="eyebrow">Tes Kompas Moral</span>
      <h1>Deontolog atau Utilitarian?</h1>
      <p class="lead">
        15 dilema moral akan mengungkap cara kamu menilai benar dan salah:
        apakah kamu berpegang pada <b style="color:var(--deon)">aturan & kewajiban</b>,
        atau pada <b style="color:var(--util)">akibat & hasil terbaik</b>?
        Tidak ada jawaban benar atau salah — jawablah dengan jujur.
      </p>
      <form class="name-form" id="nameForm" autocomplete="off">
        <input class="name-input" id="nameInput" type="text" maxlength="40"
               placeholder="Siapa namamu?" value="${esc(state.name)}" />
        <button class="btn-primary" type="submit">Mulai Tes →</button>
        <p class="hint">± 3 menit · klik jawaban untuk langsung lanjut</p>
      </form>
    </div>
  `);
  const form = el.querySelector("#nameForm");
  const input = el.querySelector("#nameInput");
  setTimeout(() => input.focus(), 350);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const v = input.value.trim();
    if (!v) {
      input.classList.remove("shake");
      void input.offsetWidth;
      input.classList.add("shake");
      input.placeholder = "Isi namamu dulu ya 🙂";
      return;
    }
    state.name = v;
    go(1);
  });
  return el;
}

/* ---------------- Layar 2-16: Pertanyaan ---------------- */
function renderQuestion(i) {
  const q = QUESTIONS[i];
  const prev = state.answers[i];
  const el = screenEl(`
    <div class="card">
      <span class="eyebrow">Pertanyaan ${i + 1} · ${q.tag}</span>
      <p class="scenario">${q.scenario}</p>
      <h2>${q.q}</h2>
      <div class="options">
        ${q.options
          .map(
            (o, k) => `
          <button class="option ${prev === k ? "prev" : ""}" data-k="${k}">
            <span class="key">${KEYS[k]}</span><span>${o.t}</span>
          </button>`
          )
          .join("")}
      </div>
    </div>
  `);
  el.querySelectorAll(".option").forEach((btn) => {
    btn.addEventListener("click", () => choose(i, +btn.dataset.k, btn));
  });
  return el;
}

function choose(i, k, btn) {
  if (state.busy) return;
  state.answers[i] = k;
  btn.classList.add("selected");
  setTimeout(() => go(state.screen + 1), 220);
}

// Pintasan keyboard A-D / 1-4
document.addEventListener("keydown", (e) => {
  const s = state.screen;
  if (s < 1 || s > QUESTIONS.length) return;
  const map = { a: 0, b: 1, c: 2, d: 3, 1: 0, 2: 1, 3: 2, 4: 3 };
  const k = map[e.key.toLowerCase()];
  if (k === undefined) return;
  const btn = app.querySelector(`.option[data-k="${k}"]`);
  if (btn) choose(s - 1, k, btn);
});

/* ---------------- Perhitungan ---------------- */
function compute() {
  const scores = state.answers.map((k, i) => (k === null ? 0 : QUESTIONS[i].options[k].s));
  const max = QUESTIONS.reduce((a, q) => a + Math.max(...q.options.map((o) => Math.abs(o.s))), 0);
  const total = scores.reduce((a, b) => a + b, 0);
  const util = Math.round(((total + max) / (2 * max)) * 100);
  return { scores, util, deon: 100 - util };
}

const PROFILES = {
  deonStrong: {
    emoji: "⚖️",
    type: "Deontolog Sejati",
    sub: "Prinsip adalah kompasmu — bukan kalkulator.",
    desc: [
      "Bagimu, moralitas adalah soal <b>kewajiban, hak, dan aturan</b> yang tidak boleh dilanggar. Sebuah tindakan bernilai baik karena tindakan itu sendiri benar — bukan karena hasilnya menguntungkan.",
      "Kamu sejalan dengan <b>Immanuel Kant</b>, yang berpendapat bahwa manusia tidak boleh diperlakukan semata-mata sebagai alat untuk mencapai tujuan. Berbohong, mencuri, atau mengorbankan orang tak bersalah tetap salah, sekalipun tampak menguntungkan.",
    ],
    strengths: ["Teguh dan dapat dipercaya", "Menjunjung martabat & hak individu", "Konsisten dalam mengambil keputusan"],
    blind: ["Bisa kaku dalam situasi darurat", "Kesulitan saat dua kewajiban bertabrakan", "Kurang mempertimbangkan dampak nyata"],
    figures: ["Immanuel Kant", "W. D. Ross", "John Rawls", "Christine Korsgaard"],
  },
  deonLean: {
    emoji: "📜",
    type: "Cenderung Deontolog",
    sub: "Aturan dulu, tapi kamu tetap menimbang akibatnya.",
    desc: [
      "Kamu umumnya percaya bahwa ada <b>batasan moral</b> yang tidak boleh dilanggar, terutama yang menyangkut hak dan martabat manusia. Namun, kamu tidak buta terhadap konsekuensi.",
      "Pandanganmu mirip dengan <b>W. D. Ross</b> yang mengenal kewajiban <i>prima facie</i>: kewajiban-kewajiban yang mengikat, namun dapat dikalahkan oleh kewajiban lain yang lebih mendesak.",
    ],
    strengths: ["Berprinsip namun tidak fanatik", "Peka terhadap keadilan", "Mampu menimbang konteks"],
    blind: ["Kadang ragu di situasi ekstrem", "Batas 'kapan melanggar aturan' bisa kabur"],
    figures: ["W. D. Ross", "Immanuel Kant", "Thomas Nagel"],
  },
  balanced: {
    emoji: "☯️",
    type: "Pluralis Moral",
    sub: "Kamu berdiri tepat di tengah spektrum.",
    desc: [
      "Kamu tidak terikat pada satu teori. Dalam beberapa kasus kamu menjunjung <b>prinsip dan hak</b>, di kasus lain kamu memilih <b>hasil terbaik</b> bagi banyak orang.",
      "Banyak filsuf modern seperti <b>Derek Parfit</b> berpendapat bahwa teori-teori moral besar sebenarnya sedang 'mendaki gunung yang sama dari sisi berbeda'. Fleksibilitasmu adalah kekuatan — selama kamu bisa menjelaskan alasan di balik setiap pilihan.",
    ],
    strengths: ["Fleksibel & kontekstual", "Mampu memahami dua sudut pandang", "Tidak dogmatis"],
    blind: ["Bisa terlihat tidak konsisten", "Sulit memutuskan saat tekanan tinggi"],
    figures: ["Derek Parfit", "Aristoteles (etika keutamaan)", "Henry Sidgwick"],
  },
  utilLean: {
    emoji: "📊",
    type: "Cenderung Utilitarian",
    sub: "Hasil itu penting — tapi ada garis yang tak kamu lewati.",
    desc: [
      "Kamu umumnya menilai tindakan dari <b>dampaknya bagi kesejahteraan orang banyak</b>. Namun, kamu masih merasa enggan melanggar beberapa aturan dasar.",
      "Ini dekat dengan <b>utilitarianisme aturan</b> (rule utilitarianism) ala <b>John Stuart Mill</b>: ikuti aturan-aturan yang, jika diterapkan secara umum, menghasilkan kebaikan terbesar.",
    ],
    strengths: ["Pragmatis & berorientasi solusi", "Peduli kesejahteraan banyak orang", "Tetap menghargai norma"],
    blind: ["Bisa tergoda membenarkan cara demi tujuan", "Prediksi konsekuensi sering tidak pasti"],
    figures: ["John Stuart Mill", "R. M. Hare", "Brad Hooker"],
  },
  utilStrong: {
    emoji: "🧮",
    type: "Utilitarian Sejati",
    sub: "Kebaikan terbesar untuk jumlah terbanyak.",
    desc: [
      "Bagimu, yang terpenting adalah <b>konsekuensi</b>. Tindakan yang benar adalah yang menghasilkan kebahagiaan paling besar dan penderitaan paling kecil bagi semua yang terdampak.",
      "Kamu sejalan dengan <b>Jeremy Bentham</b> dan <b>Peter Singer</b>. Kamu rela mengambil keputusan sulit — bahkan melanggar aturan — jika itu jelas menyelamatkan lebih banyak orang.",
    ],
    strengths: ["Rasional & tegas dalam krisis", "Imparsial — setiap orang dihitung setara", "Fokus pada dampak nyata"],
    blind: ["Bisa mengorbankan hak minoritas", "Mengabaikan keadilan & integritas pribadi", "Bergantung pada prediksi yang belum pasti"],
    figures: ["Jeremy Bentham", "John Stuart Mill", "Peter Singer", "Henry Sidgwick"],
  },
};

function pickProfile(util) {
  if (util < 30) return PROFILES.deonStrong;
  if (util < 45) return PROFILES.deonLean;
  if (util <= 55) return PROFILES.balanced;
  if (util <= 70) return PROFILES.utilLean;
  return PROFILES.utilStrong;
}

/* ---------------- Layar 17: Hasil ---------------- */
const R = 54;
const CIRC = 2 * Math.PI * R;

function ring(id, color, label) {
  return `
    <div class="ring">
      <svg viewBox="0 0 132 132" width="100%" height="100%">
        <circle class="track" cx="66" cy="66" r="${R}" fill="none" stroke-width="12"/>
        <circle class="bar" id="${id}" cx="66" cy="66" r="${R}" fill="none" stroke="${color}" stroke-width="12"
                stroke-dasharray="${CIRC}" stroke-dashoffset="${CIRC}"/>
      </svg>
      <div class="val"><b id="${id}-num">0%</b><span>${label}</span></div>
    </div>`;
}

function renderResult() {
  const { scores, util, deon } = compute();
  const p = pickProfile(util);
  state.result = { scores, util, deon };

  return screenEl(`
    <div class="card">
      <div class="result-head">
        <span class="emoji">${p.emoji}</span>
        <p class="result-sub">${esc(state.name)}, kamu adalah…</p>
        <div class="result-type">${p.type}</div>
        <p class="result-sub">${p.sub}</p>
      </div>

      <div class="ring-wrap">
        ${ring("ringDeon", "var(--deon)", "Deontologi")}
        ${ring("ringUtil", "var(--util)", "Utilitarian")}
      </div>

      <div class="spectrum">
        <div class="spectrum-bar"><div class="marker" id="marker"></div></div>
        <div class="spectrum-labels">
          <span class="l">⚖️ Deontolog</span><span class="m">Seimbang</span><span class="r">Utilitarian 🧮</span>
        </div>
      </div>

      <div class="desc">${p.desc.map((d) => `<p>${d}</p>`).join("")}</div>

      <div class="traits">
        <div class="trait"><h4>💪 Kekuatan</h4><ul>${p.strengths.map((s) => `<li>${s}</li>`).join("")}</ul></div>
        <div class="trait"><h4>⚠️ Titik Buta</h4><ul>${p.blind.map((s) => `<li>${s}</li>`).join("")}</ul></div>
      </div>

      <p class="section-title">Jejak jawabanmu (per pertanyaan)</p>
      <div class="answers-chart">
        ${scores.map((s, i) => `<div class="col" title="P${i + 1}: ${QUESTIONS[i].tag}"><div class="b ${s >= 0 ? "up" : "down"}" data-h="${Math.abs(s) * 25}"></div></div>`).join("")}
      </div>
      <div class="chart-legend"><span>▲ oranye = utilitarian</span><span>▼ biru = deontologis</span></div>

      <p class="section-title">Filsuf yang sepemikiran</p>
      <div class="figures">${p.figures.map((f) => `<span class="chip">${f}</span>`).join("")}</div>

      <p class="section-title">Memahami dua aliran</p>
      <div class="compare">
        <div class="box d"><b style="color:var(--deon)">⚖️ Deontologi</b>
          Benar-salah ditentukan oleh <i>tindakan itu sendiri</i> dan kesesuaiannya dengan kewajiban moral.
          “Lakukan yang benar, meski langit runtuh.”</div>
        <div class="box u"><b style="color:var(--util)">🧮 Utilitarianisme</b>
          Benar-salah ditentukan oleh <i>akibatnya</i>: tindakan terbaik memaksimalkan kebahagiaan
          dan meminimalkan penderitaan bagi semua.</div>
      </div>

      <div class="actions">
        <button class="btn-ghost" id="restartBtn">↺ Ulangi Tes</button>
        <button class="btn-primary" id="shareBtn">Bagikan Hasil</button>
      </div>
    </div>
  `);
}

function animateResult() {
  const { util, deon } = state.result;
  const p = pickProfile(util);

  setRing("ringDeon", deon);
  setRing("ringUtil", util);
  document.getElementById("marker").style.left = `${util}%`;
  app.querySelectorAll(".col .b").forEach((b, i) => {
    setTimeout(() => (b.style.height = `${b.dataset.h}%`), 60 * i);
  });

  document.getElementById("restartBtn").onclick = () => {
    state.answers.fill(null);
    go(0, -1);
  };
  document.getElementById("shareBtn").onclick = async (e) => {
    const text = `Hasil tes moralku: ${p.type} (${deon}% Deontologi · ${util}% Utilitarian). Kamu yang mana?`;
    try {
      if (navigator.share) await navigator.share({ title: "Deontolog atau Utilitarian?", text });
      else {
        await navigator.clipboard.writeText(text);
        e.target.textContent = "✓ Tersalin!";
        setTimeout(() => (e.target.textContent = "Bagikan Hasil"), 1800);
      }
    } catch (_) {}
  };
}

function setRing(id, pct) {
  const bar = document.getElementById(id);
  const num = document.getElementById(id + "-num");
  bar.style.strokeDashoffset = CIRC * (1 - pct / 100);
  const start = performance.now();
  const dur = 1400;
  (function tick(now) {
    const t = Math.min(1, (now - start) / dur);
    const eased = 1 - Math.pow(1 - t, 3);
    num.textContent = `${Math.round(pct * eased)}%`;
    if (t < 1) requestAnimationFrame(tick);
  })(start);
}

/* ---------------- Mulai ---------------- */
render();
