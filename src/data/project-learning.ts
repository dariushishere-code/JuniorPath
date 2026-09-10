// Extended learning material for every project: a deeper (long) description,
// pro tips, and a starter code example with TODO parts so users understand
// each concept more easily. Tips/labels carry both English and Farsi.
// Code itself keeps English identifiers; comments/instructions are localized too.

export interface ProjectLearning {
  longDescription: string;
  longDescriptionFa: string;
  tips: string[];
  tipsFa: string[];
  codeExample: string;
}

export const projectLearning: Record<string, ProjectLearning> = {
  'fe-1': {
    longDescription:
      'This project is the foundation of everything that follows. You will learn how a Vite + React + TypeScript app is organised, how to split the UI into small reusable components (Hero, About, Projects, Contact), and how Tailwind CSS lets you style them quickly. The final site is your online identity — the first link you send to recruiters — so pay close attention to spacing, typography, and responsiveness.',
    longDescriptionFa:
      'این پروژه پایهٔ همهٔ کارهای بعدی است. یاد می‌گیری یک اپ Vite + React + TypeScript چگونه سازماندهی می‌شود، چطور UI را به کامپوننت‌های کوچک و قابل استفادهٔ دوباره تقسیم کنی (معرفی، دربارهٔ من، پروژه‌ها، تماس) و تیل‌ویند چطور استایل‌دادن را سریع می‌کند. سایت نهایی هویت آنلاین توست — اولین لینکی که برای کارفرما می‌فرستی — پس به فاصله‌گذاری، تایپوگرافی و ریسپانسیو بودن دقت کن.',
    tips: [
      'Build mobile-first: create the mobile layout before the desktop one, then use sm:, md:, lg: breakpoints to enhance it.',
      'Extract repeated markup into components (one ProjectCard reused by the Projects section) instead of copying code.',
      'Keep v1 clean: solid spacing and readable typography impress more than heavy animations.',
    ],
    tipsFa: [
      'اول موبایل بساز: چیدمان موبایل را اول درست کن و بعد با breakpoint های sm:، md: و lg: آن را ارتقا بده.',
      'مارک‌آپ تکراری را به کامپوننت جدا تبدیل کن (یک ProjectCard که بخش پروژه‌ها دوباره از آن استفاده می‌کند) به جای کپی کد.',
      'نسخهٔ اول را تمیز نگه دار: فاصله‌گذاری درست و تایپوگرافی خوانا بیشتر از انیمیشن سنگین تأثیر می‌گذارد.',
    ],
    codeExample: `export function Hero({ name, role }: { name: string; role: string }) {
  return (
    <section className="py-20 text-center">
      {/* TODO: تیتر اصلی را با نام خودت اضافه کن */}
      <h1 className="text-4xl font-bold text-white">
        {/* use the {name} prop here */}
      </h1>
      {/* TODO: یک معرفی کوتاه درباره‌ی مهارت‌هایت بنویس */}
      <p className="mt-4 text-gray-400">
        {/* TODO: یک جمله درباره‌ی نقش و علاقه‌ات (role) اضافه کن */}
      </p>
      <div className="mt-6 flex gap-4 justify-center">
        {/* TODO: دکمه‌ی مشاهده پروژه‌ها را با لینک به #projects اضافه کن */}
        <a href="#projects" className="px-5 py-2.5 rounded-xl bg-purple-600 text-white">
          View projects
        </a>
      </div>
    </section>
  );
}`,
  },
  'fe-2': {
    longDescription:
      'A landing page is about layout and persuasion. You will combine a Hero, a feature grid, pricing cards, testimonials, and a footer into one coherent page. The core skill here is CSS: flexbox for one-dimensional rows and CSS Grid for the two-dimensional feature grid. You will also practice hierarchy — the call-to-action must stand out on every screen size.',
    longDescriptionFa:
      'صفحهٔ فرود دربارهٔ چیدمان و ترغیب است. بخش قهرمان، شبکهٔ ویژگی‌ها، کارت‌های قیمت، نظرات مشتریان و فوتر را در یک صفحهٔ هماهنگ ترکیب می‌کنی. مهارت اصلی این‌جاست: فِلکسباکس برای ردیف‌های تک‌بعدی و CSS Grid برای شبکهٔ دوبعدی ویژگی‌ها. همچنین سلسله‌مراتب بصری را تمرین می‌کنی — دکمهٔ دعوت به اقدام باید در هر اندازهٔ صفحه متمایز باشد.',
    tips: [
      'Sketch the layout on paper first: decide where the Hero, features, and pricing sit before writing JSX.',
      'Use CSS Grid for the feature section (grid-cols-1 sm:grid-cols-3) and flexbox for the navbar/CTA rows.',
      'Make the primary CTA the only purple element on the page so the eye goes straight to it.',
    ],
    tipsFa: [
      'اول طرح را روی کاغذ بکش: قبل از نوشتن JSX مشخص کن بخش قهرمان، ویژگی‌ها و قیمت‌گذاری کجا باشند.',
      'برای بخش ویژگی‌ها از CSS Grid استفاده کن (grid-cols-1 sm:grid-cols-3) و برای نوبار و دکمه‌ها از فلکسباکس.',
      'دکمهٔ اصلی CTA را تنها المان بنفش صفحه بگذار تا چشم کاربر مستقیم به آن برود.',
    ],
    codeExample: `export function Features() {
  const features = [
    { title: 'Fast', desc: 'Loads in under a second' },
    { title: 'Secure', desc: 'Your data stays private' },
    { title: 'Simple', desc: 'No learning curve' },
  ];
  return (
    <section className="py-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
      {features.map((f) => (
        <div key={f.title} className="p-6 rounded-2xl bg-white/5">
          {/* TODO: آیکون ویژگی را در بالای کارت اضافه کن */}
          <h3 className="text-lg font-semibold text-white">{f.title}</h3>
          {/* TODO: توضیح ویژگی (f.desc) را زیر عنوان نمایش بده */}
        </div>
      ))}
    </section>
  );
}`,
  },
  'fe-3': {
    longDescription:
      'This is your first real experience with data fetching. You will call the Open-Meteo free API, render a loading state while the request is in flight, display temperature, humidity, and wind in styled cards, and handle the case where a city cannot be found. The pattern you learn here — async fetch, loading, success, error — is repeated in almost every real-world app.',
    longDescriptionFa:
      'این اولین تجربهٔ واقعی تو با دریافت داده است. API رایگان Open-Meteo را صدا می‌زنی، در حالی که درخواست در جریان است حالت بارگذاری را رندر می‌کنی، دما، رطوبت و باد را در کارت‌های استایل‌شده نمایش می‌دهی و حالتی که شهری پیدا نشود را مدیریت می‌کنی. الگویی که این‌جا یاد می‌گیری — fetch غیرهمزمان، بارگذاری، موفقیت، خطا — تقریباً در همهٔ اپ‌های واقعی تکرار می‌شود.',
    tips: [
      'Always handle the three states: loading, success, and error — a spinner, the data cards, and a friendly message.',
      'Use a key on the search input (onKeyDown Enter) so submitting with Enter feels natural.',
      'Guard the response: check res.ok before parsing JSON, otherwise show the error state.',
    ],
    tipsFa: [
      'همیشه سه حالت را مدیریت کن: بارگذاری، موفقیت و خطا — اسپینر، کارت‌های داده و پیام دوستانه.',
      'برای ورودی جستجو از رویداد Enter (onKeyDown) استفاده کن تا ارسال با اینتر طبیعی باشد.',
      'پاسخ را ایمن کن: قبل از parse کردن JSON بررسی کن res.ok باشد، وگرنه حالت خطا را نشان بده.',
    ],
    codeExample: `async function fetchWeather(city: string) {
  // TODO: URL درخواست را با نام شهر بساز
  const url = \`https://api.open-meteo.com/v1/forecast?latitude=...&current_weather=true\`;
  try {
    const res = await fetch(url);
    // TODO: اگر res.ok نبود خطا پرتاب کن
    const data = await res.json();
    // TODO: داده‌های دما، رطوبت و باد را به state برگردان
    return data;
  } catch (err) {
    // TODO: یک پیام خطای مناسب به کاربر نشان بده
    return null;
  }
}`,
  },
  'fe-4': {
    longDescription:
      'A to-do app is the perfect sandbox for React state. You will manage an array of tasks with useState, map over it to render the list, toggle the done flag, delete items, and persist everything in localStorage so tasks survive a refresh. Understanding this flow — state drives the UI, and the UI changes state — is the single most important React concept.',
    longDescriptionFa:
      'اپ کارها بهترین زمین تمرین برای state ری‌اکت است. یک آرایهٔ task با useState مدیریت می‌کنی، روی آن map می‌زنی تا لیست رندر شود، پرچم انجام‌شده را تغییر می‌دهی، آیتم حذف می‌کنی و همه‌چیز را در localStorage ذخیره می‌کنی تا کارها بعد از رفرش بمانند. درک این جریان — اینکه state UI را می‌سازد و UI state را تغییر می‌دهد — مهم‌ترین مفهوم React است.',
    tips: [
      'Store each task as an object { id, title, done } — the id is what React needs for keys and reliable updates.',
      'Never mutate state directly; always create a new array (filter, map, spread) and pass it to the setter.',
      'For localStorage: save with JSON.stringify in one handler and load with JSON.parse in the useState initializer.',
    ],
    tipsFa: [
      'هر کار را به صورت آبجکت { id، title، done } ذخیره کن — id چیزی است که React برای key و به‌روزرسانی مطمئن نیاز دارد.',
      'هرگز state را مستقیم تغییر نده؛ همیشه آرایهٔ جدید بساز (filter، map، spread) و به setter بده.',
      'برای localStorage: با JSON.stringify در handler ذخیره کن و با JSON.parse در مقدار اولیهٔ useState بارگذاری کن.',
    ],
    codeExample: `type Task = { id: string; title: string; done: boolean };

export function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');

  const addTask = () => {
    if (!title.trim()) return; // ignore empty input
    // TODO: یک کار جدید با id یکتا به آرایه اضافه کن
    setTasks([...tasks, { id: crypto.randomUUID(), title, done: false }]);
    setTitle('');
  };

  const toggleTask = (id: string) => {
    // TODO: وضعیت done همان کار را عوض کن (بدون تغییر مستقیم state)
  };

  const removeTask = (id: string) => {
    // TODO: کار موردنظر را با filter حذف کن
  };

  return (
    <div className="space-y-3">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs to be done?"
        className="w-full px-4 py-2 rounded-lg bg-white/5"
        onKeyDown={(e) => e.key === 'Enter' && addTask()}
      />
      <button onClick={addTask} className="px-4 py-2 rounded-lg bg-purple-600 text-white">
        Add task
      </button>
      {/* TODO: لیست tasks را با map رندر کن و دکمه‌ی حذف به هر کار بده */}
    </div>
  );
}`,
  },
  'fe-5': {
    longDescription:
      'A search app is your first taste of user-driven data. The MealDB API returns recipes for an ingredient the user types. You will handle a controlled input, fire a fetch on submit, render recipe cards, and — importantly — show an empty state when nothing matches. Empty states are what turn a working demo into a product.',
    longDescriptionFa:
      'اپ جستجو اولین تجربهٔ تو با داده‌ای است که کاربر به آن شکل می‌دهد. API مربوط به MealDB با ورود یک مادهٔ اولیه، دستورها را برمی‌گرداند. یک input کنترل‌شده مدیریت می‌کنی، هنگام ارسال fetch می‌زنی، کارت‌های دستور را رندر می‌کنی و — مهم‌تر از همه — وقتی نتیجهٔ مطابقی نبود یک حالت خالی نشان می‌دهی. حالت خالی چیزی است که دموی کارآمد را به محصول تبدیل می‌کند.',
    tips: [
      'Keep the search term in state and let the submit action trigger the fetch — not every keystroke.',
      'Type the response shape (MealDB returns { meals: Recipe[] }) so you can render without any-any mistakes.',
      'Before mapping, always check that the array exists: JSON data can be null when there are no results.',
    ],
    tipsFa: [
      'متن جستجو را در state نگه دار و اجازه بده عمل ارسال (submit) fetch را اجرا کند — نه هر تایپ.',
      'شکل پاسخ را مشخص کن (MealDB یک { meals: Recipe[] } برمی‌گرداند) تا بدون خطا رندر کنی.',
      'قبل از map همیشه بررسی کن آرایه وجود دارد: دادهٔ JSON وقتی نتیجه‌ای نیست می‌تواند null باشد.',
    ],
    codeExample: `import { useState } from 'react';

export function RecipeSearch() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);

  const search = async () => {
    if (!query.trim()) return;
    // TODO: با query یک درخواست fetch به MealDB بزن
    const res = await fetch(\`https://www.themealdb.com/api/json/v1/1/search.php?s=\${query}\`);
    const data = await res.json();
    // TODO: اگر data.meals خالی بود یک پیام «نتیجه‌ای پیدا نشد» نشان بده
    setRecipes(data.meals ?? []);
  };

  return (
    <div className="space-y-4">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by ingredient, e.g. chicken"
        className="w-full px-4 py-2 rounded-lg bg-white/5"
      />
      <button onClick={search} className="px-4 py-2 rounded-lg bg-purple-600 text-white">
        Search
      </button>
      {/* TODO: کارت دستورها را از روی recipes رندر کن */}
    </div>
  );
}`,
  },
  'fe-6': {
    longDescription:
      'Here you bridge React state with the browser Audio API. You will build a playlist, wire play/pause controls to an <audio> element, and show a progress bar that rewinds when the user clicks it. The key idea is syncing: the audio element is the source of truth, and React state reflects it through events like onTimeUpdate and onEnded.',
    longDescriptionFa:
      'اینجا state ری‌اکت را با Audio API مرورگر وصل می‌کنی. یک پلی‌لیست می‌سازی، دکمه‌های پخش/توقف را به المان <audio> متصل می‌کنی و یک نوار پیشرفت نشان می‌دهی که با کلیک کاربر عقب/جلو می‌رود. ایدهٔ کلیدی همگام‌سازی است: المان audio منبع حقیقت است و state ری‌اکت از طریق رویدادهایی مثل onTimeUpdate و onEnded آن را منعکس می‌کند.',
    tips: [
      'Use a single ref for the audio element and call audioRef.current.play() / pause() from handlers.',
      'Store the currently playing song id in state, and keep currentTime paused vs playing in a separate boolean.',
      'For the progress bar, set the width from state on each onTimeUpdate — do not fight the browser by setting currentTime on every render.',
    ],
    tipsFa: [
      'برای المان audio یک ref بگیر و از داخل handler ها با audioRef.current.play() / pause() کار کن.',
      'id آهنگ در حال پخش را در state نگه دار و وضعیت پخش/توقف را در یک boolean جدا.',
      'برای نوار پیشرفت، عرض را در هر onTimeUpdate از روی state تنظیم کن — هر رندر currentTime را دستکاری نکن.',
    ],
    codeExample: `import { useRef, useState } from 'react';

export function Player() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = (src: string) => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      // TODO: مسیر آهنگ (src) را روی المان audio تنظیم کن و play را صدا بزن
      audioRef.current.src = src;
      void audioRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <div className="p-6 rounded-2xl bg-white/5">
      <audio
        ref={audioRef}
        onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime)}
      />
      {/* TODO: نوار پیشرفت را بر اساس progress بساز (محاسبه‌ی درصد با duration) */}
      {/* TODO: دکمه‌ی پخش و یک لیست از آهنگ‌ها اضافه کن */}
    </div>
  );
}`,
  },
  'fe-7': {
    longDescription:
      'A quiz app is a state-machine exercise. You track the current question index, the selected answer, and the running score. On submit you compare the answer to the correct one, then move to the next question or show the final score screen. This shaped state — a few interdependent values that evolve in sync — is exactly what real apps juggle every day.',
    longDescriptionFa:
      'اپ کوئیز یک تمرین state-machine است. ایندکس سؤال فعلی، پاسخ انتخاب‌شده و امتیاز در حال جریان را دنبال می‌کنی. هنگام ارسال، پاسخ را با پاسخ درست مقایسه می‌کنی و بعد به سؤال بعدی می‌روی یا صفحهٔ امتیاز نهایی را نشان می‌دهی. این state شکل‌گرفته — چند مقدار وابسته که همگام تغییر می‌کنند — دقیقاً همان چیزی است که اپ‌های واقعی هر روز با آن سر و کار دارند.',
    tips: [
      'Model the data first: an array of { question, options: string[], correctIndex } makes every screen trivial to render.',
      'Derive what you can: score and done need no separate state — compute done from currentIndex === questions.length.',
      'Disable the next button while no option is selected; it forces a clean UX and simplifies the logic.',
    ],
    tipsFa: [
      'اول داده را مدل کن: آرایه‌ای از { question، options: string[]، correctIndex } رندر هر صفحه را ساده می‌کند.',
      'تا جایی که می‌شود محاسبه کن: برای امتیاز و پایان نیازی به state جدا نیست — پایان را از currentIndex === questions.length به دست بیاور.',
      'تا وقتی گزینه‌ای انتخاب نشده دکمهٔ بعدی را غیرفعال کن؛ هم تجربهٔ کاربر را تمیز می‌کند هم منطق را ساده‌تر.',
    ],
    codeExample: `type Quiz = { question: string; options: string[]; correctIndex: number };

export function QuizApp({ questions }: { questions: Quiz[] }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const submit = () => {
    if (selected === null) return;
    // TODO: اگر پاسخ درست بود امتیاز را بالا ببر
    if (selected === questions[current].correctIndex) {
      setScore((s) => s + 1);
    }
    // TODO: به سؤال بعدی برو و اگر سؤالی نمانده صفحه‌ی امتیاز را نشان بده
    setCurrent((c) => c + 1);
    setSelected(null);
  };

  return (
    <div className="space-y-4">
      {/* TODO: سؤال فعلی را از questions[current] نمایش بده */}
      {/* TODO: گزینه‌ها را با map رندر کن و انتخاب را ذخیره کن */}
      <button onClick={submit} disabled={selected === null} className="px-4 py-2 rounded-lg bg-purple-600 text-white disabled:opacity-40">
        Submit
      </button>
    </div>
  );
}`,
  },
  'fe-8': {
    longDescription:
      'An expense tracker combines forms, derived state, and simple visualization. Users add income or expenses with a category; the running balance is derived from the transaction list with a reduce. Learning to distinguish state (the transactions) from derived data (totals) keeps your components predictable and bug-free.',
    longDescriptionFa:
      'ردیاب هزینه‌ها فرم‌ها، state مشتق‌شده و تجسم ساده را ترکیب می‌کند. کاربران درآمد یا هزینه را با یک دسته اضافه می‌کنند؛ موجودی از روی لیست تراکنش‌ها با reduce به دست می‌آید. یاد می‌گیری بین state (تراکنش‌ها) و دادهٔ مشتق‌شده (جمع‌ها) تفاوت بگذاری تا کامپوننت‌هایت قابل پیش‌بینی و بدون باگ بمانند.',
    tips: [
      'Store one array of transactions; derive incomes, expenses, and balance with reduce — never keep three totals in state.',
      'Validate the amount: reject empty or non-numeric values before adding new transactions.',
      'Persist the transactions to localStorage like you did in the to-do app — data loss is the worst UX.',
    ],
    tipsFa: [
      'یک آرایهٔ تراکنش نگه دار و درآمد، هزینه و موجودی را با reduce به دست بیاور — هرگز سه جمع را در state نگه ندار.',
      'مبلغ را اعتبارسنجی کن: قبل از افزودن تراکنش، مقدار خالی یا غیرعددی را رد کن.',
      'مثل اپ کارها، تراکنش‌ها را در localStorage ذخیره کن — از دست رفتن داده بدترین تجربهٔ کاربر است.',
    ],
    codeExample: `type Tx = { id: string; label: string; amount: number; type: 'income' | 'expense' };

export function ExpenseTracker() {
  const [transactions, setTransactions] = useState<Tx[]>([]);

  const balance = transactions.reduce((sum, t) => {
    // TODO: برای expense ها مبلغ را منفی کن (sum را کامل کن)
    return sum + (t.type === 'income' ? t.amount : -t.amount);
  }, 0);

  const addTransaction = (label: string, amount: number, type: Tx['type']) => {
    // TODO: اگر label خالی یا amount نامعتبر بود ignore کن
    if (!label.trim() || Number.isNaN(amount) || amount <= 0) return;
    setTransactions([...transactions, { id: crypto.randomUUID(), label, amount, type }]);
  };

  return (
    <div className="space-y-4">
      {/* TODO: فرم افزودن تراکنش (label، amount، نوع) بساز */}
      <h3 className="text-2xl font-bold text-white">Balance: \${balance.toFixed(2)}</h3>
      {/* TODO: لیست تراکنش‌ها را با رنگ سبز (income) و قرمز (expense) رندر کن */}
    </div>
  );
}`,
  },
  'fe-9': {
    longDescription:
      'The pomodoro timer is all about timing and cleanup. You will drive a 25-minute work session and a 5-minute break with an interval, tick a seconds counter down, and — the key lesson — clear that interval in the useEffect cleanup so nothing leaks when the component unmounts or the mode switches.',
    longDescriptionFa:
      'تایمر پومودورو دربارهٔ زمان‌بندی و پاک‌سازی است. یک جلسهٔ کاری ۲۵ دقیقه‌ای و استراحت ۵ دقیقه‌ای را با interval جلو می‌بری، شمارندهٔ ثانیه را کم می‌کنی و — درس اصلی — همان interval را در تابع پاک‌سازی useEffect پاک می‌کنی تا وقتی کامپوننت unmount می‌شود یا حالت عوض می‌شود چیزی نشت نکند.',
    tips: [
      'Never store a countdown in state with setInterval inside setState — derive it from a single endTime to stay accurate.',
      'Always return the cleanup function from useEffect that clears the interval when secondsLeft changes.',
      'Drive the display from one number (secondsLeft) and format it with Math.floor(sec/60) and sec%60.',
    ],
    tipsFa: [
      'هرگز شمارش معکوس را با setInterval داخل setState ذخیره نکن — آن را از یک endTime واحد به دست بیاور تا دقیق بماند.',
      'همیشه از useEffect تابع پاک‌سازی برگردان که وقتی secondsLeft تغییر کرد interval را پاک کند.',
      'نمایش را از یک عدد (secondsLeft) بگیر و با Math.floor(sec/60) و sec%60 فرمت کن.',
    ],
    codeExample: `import { useEffect, useState } from 'react';

const WORK = 25 * 60;

export function Pomodoro() {
  const [secondsLeft, setSecondsLeft] = useState(WORK);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    // TODO: هر ثانیه یک بار secondsLeft را کم کن (با setInterval)
    const id = setInterval(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);
    // TODO: وقتی کامپوننت unmount شد یا running تغییر کرد interval را clean کن
    return () => clearInterval(id);
  }, [running]);

  // TODO: وقتی secondsLeft به صفر رسید، به حالت استراحت برو (۵ دقیقه)

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  return (
    <div className="text-center">
      <h2 className="text-6xl font-bold text-white">{minutes}:{seconds < 10 ? '0' : ''}{seconds}</h2>
      {/* TODO: دکمه‌ی شروع/توقف را اضافه کن */}
    </div>
  );
}`,
  },
  'fe-10': {
    longDescription:
      'Photo galleries look simple but hide two classic React patterns. First, filtering: a selected category state derives the visible subset of photos. Second, the lightbox: a modal triggered by a click, informed by the clicked photo, and closed with an overlay click or Escape. Master those and you can build dashboards, shop grids, and anything image-heavy.',
    longDescriptionFa:
      'گالری تصاویر ساده به نظر می‌رسد اما دو الگوی کلاسیک React را پنهان می‌کند. اول فیلتر کردن: یک state دستهٔ انتخاب‌شده، زیرمجموعهٔ قابل مشاهدهٔ تصاویر را به دست می‌آورد. دوم لایت‌باکس: یک مودال که با کلیک باز می‌شود، از روی تصویر کلیک‌شده پر می‌شود و با کلیک روی پس‌زمینه یا Escape بسته می‌شود. با تسلط بر این‌ها می‌توانی داشبورد، شبکهٔ فروشگاهی و هر چیز پر از تصویر بسازی.',
    tips: [
      'Use picsum.photos with a seed so every refresh shows the same gallery — nice for development.',
      'Filter with useMemo: `photos.filter(p => category === "all" || p.category === category)`.',
      'For the lightbox, track the selected photo id — render a fixed overlay only when a id exists, and close on Escape via useEffect key listener.',
    ],
    tipsFa: [
      'با seed از picsum.photos استفاده کن تا هر رفرش همان گالری را نشان دهد — برای توسعه عالی است.',
      'با useMemo فیلتر کن: photos.filter(p => category === "all" || p.category === category).',
      'برای لایت‌باکس id عکس انتخاب‌شده را نگه دار — فقط وقتی id وجود دارد overlay ثابت رندر کن و با شنوندهٔ کلید Escape داخل useEffect آن را ببند.',
    ],
    codeExample: `import { useMemo, useState } from 'react';

const photos = [
  { id: 1, src: 'https://picsum.photos/seed/1/400/300', category: 'nature' },
  { id: 2, src: 'https://picsum.photos/seed/2/400/300', category: 'city' },
];

export function Gallery() {
  const [category, setCategory] = useState('all');
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const visible = useMemo(() => {
    // TODO: فیلتر دسته را کامل کن
    return category === 'all' ? photos : photos.filter((p) => p.category === category);
  }, [category]);

  return (
    <div>
      {/* TODO: دکمه‌های فیلتر: همه، nature، city */}
      <div className="grid grid-cols-2 gap-4">
        {visible.map((photo) => (
          // TODO: با کلیک روی تصویر، selectedId را تنظیم کن
          <img key={photo.id} src={photo.src} className="rounded-xl cursor-pointer" onClick={() => setSelectedId(photo.id)} />
        ))}
      </div>
      {/* TODO: اگر selectedId وجود داشت یک لایت‌باکس بساز که تصویر بزرگ را نشان می‌دهد */}
    </div>
  );
}`,
  },
  'be-1': {
    longDescription:
      'The Notes REST API is your first backend project and the foundation of every API that follows. You will spin up an Express server, build the four CRUD routes (GET, POST, PUT, DELETE), store notes in an in-memory array, and return proper JSON with meaningful HTTP status codes. Master route naming and status codes here and every future API becomes easier.',
    longDescriptionFa:
      'API یادداشت‌ها اولین پروژهٔ بک‌اند تو و پایهٔ همهٔ API های بعدی است. یک سرور Express راه‌اندازی می‌کنی، چهار مسیر CRUD (GET، POST، PUT، DELETE) می‌سازی، یادداشت‌ها را در یک آرایهٔ درون حافظه ذخیره می‌کنی و JSON درست با کد وضعیت HTTP معنادار برمی‌گردانی. اگر نام‌گذاری مسیرها و کد وضعیت را همین‌جا یاد بگیری، هر API آینده ساده‌تر می‌شود.',
    tips: [
      'Keep data in an array and use the note id as the route parameter — /api/notes/:id gives you update and delete for free.',
      'Return proper status codes: 200 for reads, 201 after create, 404 when the id does not exist.',
      'Use express.json() middleware early — without it, req.body stays undefined for POST/PUT.',
    ],
    tipsFa: [
      'داده را در یک آرایه نگه دار و id یادداشت را پارامتر مسیر کن — /api/notes/:id به‌صورت رایگان به تو update و delete می‌دهد.',
      'کد وضعیت درست برگردان: 200 برای خواندن، 201 بعد از ساخت، 404 وقتی id وجود ندارد.',
      'از middleware Express.json() همان اول استفاده کن — بدون آن، req.body در POST/PUT تعریف‌نشده می‌ماند.',
    ],
    codeExample: `import express from 'express';

const app = express();
app.use(express.json());

type Note = { id: string; title: string; body: string };
const notes: Note[] = [];

// TODO: GET /api/notes — لیست همه‌ی یادداشت‌ها را برگردان
app.get('/api/notes', (_req, res) => {
  res.json(notes);
});

// TODO: POST /api/notes — یک یادداشت جدید بساز و id بده
app.post('/api/notes', (req, res) => {
  const { title, body } = req.body ?? {};
  // TODO: اگر title یا body خالی بود 400 برگردان
  const note: Note = { id: crypto.randomUUID(), title, body };
  notes.push(note);
  res.status(201).json(note);
});

// TODO: PUT /api/notes/:id — یادداشت موجود را به‌روزرسانی کن (در غیر این صورت 404)
// TODO: DELETE /api/notes/:id — یادداشت را حذف کن (در غیر این صورت 404)

app.listen(3000, () => console.log('Server ready on :3000'));`,
  },
  'be-2': {
    longDescription:
      'The Task Tracker extends your first API with the two concepts that make backends real: validation and filtering. A task has a title, a completed flag, and a due date. You will write middleware that rejects empty titles with a 400, support queries like ?completed=true, and split routes into a separate router file — the same structure real codebases use.',
    longDescriptionFa:
      'پیگیری‌کنندهٔ کارها اولین API تو را با دو مفهومی که بک‌اند را واقعی می‌کنند گسترش می‌دهد: اعتبارسنجی و فیلتر. یک task عنوان، پرچم انجام‌شده و تاریخ سررسید دارد. middleware ای می‌نویسی که عنوان خالی را با 400 رد می‌کند، از query هایی مثل ?completed=true پشتیبانی می‌کنی و مسیرها را به یک فایل router جدا تقسیم می‌کنی — همان ساختاری که پروژه‌های واقعی دارند.',
    tips: [
      'Write validation as reusable middleware so every route that accepts a task title enforces it identically.',
      'Filter by reading req.query.completed — parse it to a boolean before comparing with the stored flag.',
      'Refactor into Router() as early as exercises allow; it keeps index.ts tiny and routes testable.',
    ],
    tipsFa: [
      'اعتبارسنجی را به صورت middleware قابل استفاده نوشته کن تا هر مسیری که task می‌پذیرد همان بررسی را اعمال کند.',
      'با خواندن req.query.completed فیلتر کن — قبل از مقایسه با پرچم ذخیره‌شده، آن را به boolean تبدیل کن.',
      'تا جایی که تمرین اجازه می‌دهد زود به Router() رفکتور کن؛ index.ts کوچک می‌ماند و مسیرها تست‌پذیر می‌شوند.',
    ],
    codeExample: `import express from 'express';

const app = express();
app.use(express.json());

type Task = { id: string; title: string; completed: boolean; dueDate: string };
const tasks: Task[] = [];

// TODO: middleware اعتبارسنجی — اگر title خالی بود 400 برگردان
const validateTitle = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (!req.body?.title?.trim()) {
    res.status(400).json({ error: 'title is required' });
    return;
  }
  next();
};

app.get('/api/tasks', (req, res) => {
  const completed = req.query.completed;
  // TODO: اگر completed فیلتر شده بود فقط کارهای منطبق را برگردان
  res.json(tasks);
});

app.post('/api/tasks', validateTitle, (req, res) => {
  // TODO: task جدید بساز و به آرایه اضافه کن (201)
});

// TODO: PATCH /api/tasks/:id — تکمیل/تاریخ سررسید را به‌روزرسانی کن

app.listen(3000, () => console.log('Server ready on :3000'));`,
  },
  'be-3': {
    longDescription:
      'A URL shortener is a tiny but elegant backend puzzle. You accept a long URL, generate a compact 6-character code, store the mapping, and redirect /:code to the original. You will practice base conversion (think of the code as a number in base-62), correct redirects (301 vs 302), and lookup logic with a clean 404 for missing codes.',
    longDescriptionFa:
      'کوتاه‌کنندهٔ لینک یک معمای کوچک اما ظریف بک‌اند است. یک URL طولانی می‌پذیری، یک کد فشردهٔ ۶ کاراکتری می‌سازی، نگاشت را ذخیره می‌کنی و /:code را به آدرس اصلی ریدایرکت می‌کنی. تبدیل مبنا را تمرین می‌کنی (به کد به عنوان یک عدد در مبنای ۶۲ فکر کن)، ریدایرکت درست (301 در برابر 302) و منطق جستجو با 404 مرتب برای کدهای نبوده.',
    tips: [
      'Generate the code from a random number using base-62 (a-z, A-Z, 0-9) so it stays short and collision-resistant.',
      'Use 302 Found for redirects while the page is temporary and 301 Moved Permanently once it is stable — or keep it simple with 302.',
      'Store the mapping in a plain object (or a Map) keyed by the short code; a 404 for unknown codes closes the loop.',
    ],
    tipsFa: [
      'کد را از یک عدد تصادفی با مبنای ۶۲ (a-z، A-Z، 0-9) بساز تا کوتاه و مقاوم در برابر برخورد بماند.',
      'وقتی صفحه موقتی است از 302 و وقتی پایدار است از 301 استفاده کن — یا ساده با 302 جلو برو.',
      'نگاشت را در یک آبجکت ساده (یا Map) با کلید کد کوتاه ذخیره کن؛ 404 برای کدهای ناشناخته چرخه را کامل می‌کند.',
    ],
    codeExample: `import express from 'express';

const app = express();
app.use(express.json());

const links = new Map<string, string>(); // shortCode -> longUrl

function shortCode(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  // TODO: یک کد ۶ کاراکتری تصادفی از chars بساز
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

app.post('/api/shorten', (req, res) => {
  const { url } = req.body ?? {};
  // TODO: اگر url معتبر نبود 400 برگردان (چک کردن http/https کافی است)
  const code = shortCode();
  links.set(code, url);
  // TODO: آدرس کامل کوتاه‌شده را در پاسخ برگردان
  res.status(201).json({ shortUrl: \`http://localhost:3000/\${code}\` });
});

app.get('/:code', (req, res) => {
  const target = links.get(req.params.code);
  // TODO: اگر کد پیدا نشد 404 و در غیر این صورت res.redirect بزن
  if (!target) {
    res.status(404).json({ error: 'short code not found' });
    return;
  }
  res.redirect(302, target);
});

app.listen(3000, () => console.log('Server ready on :3000'));`,
  },
  'be-4': {
    longDescription:
      'The Blog Post API introduces the two pillars of secure backends: authentication and ownership. Users register with a hashed password (bcrypt), log in to receive a JWT, and that token protects the routes that create or modify posts. You will also model a real relation — posts belong to a user, comments belong to a post — which prepares you for any database design.',
    longDescriptionFa:
      'API وبلاگ دو ستون اصلی بک‌اند امن را معرفی می‌کند: احراز هویت و مالکیت. کاربران با رمز عبور هش‌شده (bcrypt) ثبت‌نام می‌کنند، برای ورود JWT دریافت می‌کنند و همان توکن از مسیرهایی که پست می‌سازند یا تغییر می‌دهند محافظت می‌کند. همچنین یک رابطهٔ واقعی را مدل می‌کنی — پست‌ها متعلق به کاربر و کامنت‌ها متعلق به پست — که تو را برای هر طراحی پایگاه داده آماده می‌کند.',
    tips: [
      'Hash passwords with bcrypt (10 salt rounds) and compare with bcrypt.compare on login — never decrypt anything.',
      'Sign JWTs with a secret from an environment variable, not a hardcoded string, and keep it out of git.',
      'In the auth middleware, read the Bearer token from the Authorization header, verify it, and attach the user id to req.',
    ],
    tipsFa: [
      'رمز عبور را با bcrypt هش کن (۱۰ دور salt) و در ورود با bcrypt.compare مقایسه کن — هرگز چیزی را decrypt نکن.',
      'JWT ها را با یک secret از environment variable امضا کن، نه رشتهٔ ثابت داخل کد، و آن را از git خارج نگه دار.',
      'در middleware احراز هویت، توکن Bearer را از header Authorization بخوان، verify کن و id کاربر را به req اضافه کن.',
    ],
    codeExample: `import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());

type User = { id: string; email: string; passwordHash: string };
const users: User[] = [];

app.post('/api/register', async (req, res) => {
  const { email, password } = req.body ?? {};
  // TODO: ایمیل تکراری را رد کن (409)
  const passwordHash = await bcrypt.hash(password, 10);
  const user: User = { id: crypto.randomUUID(), email, passwordHash };
  users.push(user);
  res.status(201).json({ id: user.id, email: user.email });
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body ?? {};
  const user = users.find((u) => u.email === email);
  // TODO: مقایسه‌ی رمز با bcrypt.compare و صدور JWT (با id کاربر) بعد از موفقیت
  // TODO: در صورت نامعتبر بودن 401 برگردان
});

// TODO: middleware auth — توکن Bearer را verify کن و req.userId را تنظیم کن
// TODO: POST /api/posts — با auth، پست متعلق به req.userId بساز

app.listen(3000, () => console.log('Server ready on :3000'));`,
  },
  'be-5': {
    longDescription:
      'The Book Library API is about thoughtful query handling. Books can be searched by title or author, borrowed, and returned. You will learn substring search, a status lifecycle (available → borrowed → available), and — the recurring theme of good APIs — precise 404s whenever a book or a borrow attempt does not exist.',
    longDescriptionFa:
      'API کتابخانه دربارهٔ مدیریت پرس‌وجوی سنجیده است. کتاب‌ها را با عنوان یا نویسنده جستجو می‌کنی، امانت می‌گیری و برمی‌گردانی. جستجوی زیررشته‌ای، چرخهٔ زندگی وضعیت (در دسترس ← امانت گرفته‌شده ← در دسترس) و — تم تکرارشوندهٔ API های خوب — 404 دقیق هر وقت کتاب یا درخواست امانت وجود نداشت را یاد می‌گیری.',
    tips: [
      'Search with a case-insensitive includes check: book.title.toLowerCase().includes(q.toLowerCase()).',
      'Model status as a string field with a small set of allowed values — it is easy to read and to filter on.',
      'Reject a borrow when the book is already borrowed (409 Conflict) and allow renewals only for borrowed books.',
    ],
    tipsFa: [
      'جستجو را با بررسی includes و حساس‌نبودن به بزرگی‌وکوچکی حروف انجام بده: book.title.toLowerCase().includes(q.toLowerCase()).',
      'وضعیت را با یک فیلد رشته‌ای و مجموعهٔ کوچکی از مقادیر مجاز مدل کن — هم خواندن آسان است هم فیلترکردن روی آن.',
      'وقتی کتاب از قبل امانت گرفته شده اجازهٔ امانت دوباره نده (409 Conflict) و تمدید را فقط برای کتاب‌های امانتی بگذار.',
    ],
    codeExample: `import express from 'express';

const app = express();
app.use(express.json());

type Book = { id: string; title: string; author: string; status: 'available' | 'borrowed' };
const books: Book[] = [];

// TODO: GET /api/books?q=... — جستجوی غیرحساس با عنوان یا نویسنده
app.get('/api/books', (req, res) => {
  const q = (req.query.q as string ?? '').toLowerCase();
  // TODO: اگر q خالی بود همه‌ی کتاب‌ها را برگردان، وگرنه فقط موارد منطبق
  res.json(books);
});

// TODO: POST /api/books/:id/borrow — اگر موجود بود وضعیت را borrowed کن (بدون آن 404/409)
// TODO: POST /api/books/:id/return — وضعیت را دوباره available کن

app.listen(3000, () => console.log('Server ready on :3000'));`,
  },
  'be-6': {
    longDescription:
      'The Weather Proxy API is your lesson in server-side integration. The browser never talks to the weather provider directly — instead your Express server calls it, caches the result, and forwards the data. This keeps the API key out of the client and shows the classic proxy + cache pattern used everywhere in production.',
    longDescriptionFa:
      'API پروکسی آب‌وهوا درس تو در یکپارچه‌سازی سمت سرور است. مرورگر هرگز مستقیم با provider آب‌وهوا حرف نمی‌زند — در عوض سرور Express تو آن را صدا می‌زند، نتیجه را کش می‌کند و داده را جلو می‌فرستد. این کار API key را از کلاینت دور نگه می‌دارد و الگوی کلاسیک پروکسی + کش را که همه‌جا در تولید استفاده می‌شود نشان می‌دهد.',
    tips: [
      'Store the provider API key in process.env and read client requests only for the city parameter — never forward other input.',
      'Cache per city in a Map with a timestamp; return stale data with a source: "cache" field instead of hammering the provider.',
      'Validate the provider response before forwarding — a malformed upstream response should become your 502, not a crash.',
    ],
    tipsFa: [
      'API key را در process.env نگه دار و از درخواست کلاینت فقط پارامتر شهر را بخوان — هرگز ورودی دیگری را جلو نفرست.',
      'برای هر شهر در یک Map با timestamp کش کن؛ به‌جای فشار به provider، دادهٔ کش‌شده را با فیلد source: "cache" برگردان.',
      'پاسخ provider را قبل از ارسال اعتبارسنجی کن — پاسخ معیوب بالا دستی باید به 502 تو تبدیل شود، نه crash.',
    ],
    codeExample: `import express from 'express';

const app = express();

const cache = new Map<string, { data: unknown; at: number }>();
const TTL = 10 * 60 * 1000; // 10 minutes

app.get('/api/weather', async (req, res) => {
  const city = String(req.query.city ?? 'tehran');
  const hit = cache.get(city);

  // TODO: اگر کش هنوز معتبر بود همان را برگردان (مناسب و بدون درخواست اضافه)
  if (hit && Date.now() - hit.at < TTL) {
    res.json({ source: 'cache', ...(hit.data as object) });
    return;
  }

  try {
    // TODO: با process.env.WEATHER_KEY به provider درخواست بده (نه کلید hardcode)
    const upstream = await fetch(
      \`https://api.openweathermap.org/data/2.5/weather?q=\${city}&appid=\${process.env.WEATHER_KEY}\`
    );
    const data = await upstream.json();
    cache.set(city, { data, at: Date.now() });
    res.json({ source: 'live', ...data });
  } catch {
    // TODO: خطای بالادست را به 502 تبدیل کن
    res.status(502).json({ error: 'upstream weather service failed' });
  }
});

app.listen(3000, () => console.log('Server ready on :3000'));`,
  },
  'be-7': {
    longDescription:
      'The Product Catalog API is the closest you get to real e-commerce before databases enter the picture. You will accept query parameters for category, price sorting, and stock availability, and slice the results into pages. The lesson: every e-commerce frontend (a shop grid, a marketplace) relies on a backend that parses query strings into a filtered, sorted, paginated response.',
    longDescriptionFa:
      'API کاتالوگ محصولات نزدیک‌ترین چیز به فروشگاه اینترنتی واقعی است، قبل از اینکه پایگاه داده وارد تصویر شود. پارامترهای query برای دسته، مرتب‌سازی قیمت و موجودی را می‌پذیری و نتایج را به صفحه‌ها تقسیم می‌کنی. درس این است: هر فرانت‌اند خرید (شبکهٔ فروشگاهی، بازار آنلاین) به بک‌اندی وابسته است که query string را به پاسخ فیلترشده، مرتب‌شده و صفحه‌بندی‌شده تبدیل می‌کند.',
    tips: [
      'Parse query values defensively: Number(req.query.page) can be NaN — default to 1 and clamp negatives.',
      'Apply filter → sort → paginate in that order, in one place, so the pipeline is easy to reason about.',
      'Return a pagination envelope ({ items, total, page, pageSize }) — clients need metadata, not just items.',
    ],
    tipsFa: [
      'مقادیر query را ایمن parse کن: Number(req.query.page) می‌تواند NaN باشد — پیش‌فرض ۱ بگذار و مقادیر منفی را ببند.',
      'فیلتر ← مرتب‌سازی ← صفحه‌بندی را به همین ترتیب و در یک جا اعمال کن تا لولهٔ پردازش قابل فهم باشد.',
      'یک پاکت صفحه‌بندی برگردان ({ items، total، page، pageSize }) — کلاینت به metadata نیاز دارد، نه فقط آیتم‌ها.',
    ],
    codeExample: `import express from 'express';

const app = express();
app.use(express.json());

type Product = { id: string; name: string; price: number; category: string; inStock: boolean };
const products: Product[] = [];

app.get('/api/products', (req, res) => {
  const category = req.query.category as string | undefined;
  const sort = req.query.sort as string | undefined; // 'price_asc' | 'price_desc'
  const page = Math.max(1, Number(req.query.page) || 1);
  const pageSize = Math.min(50, Number(req.query.pageSize) || 10);

  let result = products;
  // TODO: فیلتر بر اساس category و inStock را اضافه کن
  // TODO: مرتب‌سازی قیمت را بر اساس sort اعمال کن
  // TODO: صفحه‌بندی: slice بر اساس page و pageSize و برگرداندن total

  res.json({ items: result, total: result.length, page, pageSize });
});

app.listen(3000, () => console.log('Server ready on :3000'));`,
  },
  'be-8': {
    longDescription:
      'File uploads change how your API receives data: instead of JSON, browsers send multipart/form-data. You will use multer on the server, validate type and size, store files on disk, and serve them back with a download link. This project also teaches lifecycle hygiene — deleting a file from disk when the record is deleted, and rejecting oversized uploads with a clear error.',
    longDescriptionFa:
      'آپلود فایل نحوهٔ دریافت داده توسط API را عوض می‌کند: به‌جای JSON، مرورگرها multipart/form-data می‌فرستند. در سرور از multer استفاده می‌کنی، نوع و اندازه را اعتبارسنجی می‌کنی، فایل‌ها را روی دیسک ذخیره می‌کنی و با یک لینک دانلود دوباره سرو می‌کنی. این پروژه بهداشت چرخهٔ حیات را هم یاد می‌دهد — حذف فایل از دیسک وقتی رکوردش حذف می‌شود و رد کردن آپلودهای بیش از حد بزرگ با خطای واضح.',
    tips: [
      'Configure multer with a destination folder and a limits object ({ fileSize: 5 * 1024 * 1024 }) so big files are rejected.',
      'Generate the stored filename yourself (timestamp + ext) — never trust the client filename for the disk path.',
      'Store only metadata (original name, size, path, mimetype) in your records; serve files from a GET /files/:id route.',
    ],
    tipsFa: [
      'multer را با پوشهٔ مقصد و آبجکت limits ({ fileSize: 5 * 1024 * 1024 }) تنظیم کن تا فایل‌های بزرگ رد شوند.',
      'نام فایل ذخیره‌شده را خودت بساز (timestamp + پسوند) — هرگز نام فایل کلاینت را برای مسیر دیسک قبول نکن.',
      'فقط metadata (نام اصلی، اندازه، مسیر، mimetype) را در رکوردها ذخیره کن و فایل را از مسیر GET /files/:id سرو کن.',
    ],
    codeExample: `import express from 'express';
import multer from 'multer';

const app = express();

const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

type FileRecord = { id: string; originalName: string; size: number; path: string };
const files: FileRecord[] = [];

// TODO: POST /api/files — آپلود را با upload.single('file') دریافت کن
app.post('/api/files', upload.single('file'), (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: 'no file received' });
    return;
  }
  // TODO: filename را با timestamp و پسوند اصلی بساز و روی دیسک ذخیره کن
  const record: FileRecord = {
    id: crypto.randomUUID(),
    originalName: req.file.originalname,
    size: req.file.size,
    path: req.file.path,
  };
  files.push(record);
  res.status(201).json({ id: record.id, downloadUrl: \`/api/files/\${record.id}/download\` });
});

// TODO: GET /api/files — لیست metadata ها
// TODO: GET /api/files/:id/download — فایل را از دیسک برگردان (res.sendFile)
// TODO: DELETE /api/files/:id — هم رکورد و هم فایل روی دیسک را حذف کن

app.listen(3000, () => console.log('Server ready on :3000'));`,
  },
  'be-9': {
    longDescription:
      'The Real-time Chat Server flips your mental model: with WebSockets the server can push data to many clients the moment something happens. You will create rooms, broadcast messages, notify who joined and left, keep the last 50 messages per room in memory, and return that history to new arrivals. Event-driven programming starts here — and chat is its classic classroom.',
    longDescriptionFa:
      'سرور چت بلادرنگ مدل ذهنی تو را برمی‌گرداند: با WebSockets سرور می‌تواند همان لحظه داده را به کلاینت‌های زیادی push کند. اتاق می‌سازی، پیام‌ها را broadcast می‌کنی، ورود و خروج را اطلاع می‌دهی، آخرین ۵۰ پیام هر اتاق را در حافظه نگه می‌داری و همان تاریخچه را به تازه‌واردها برمی‌گردانی. برنامه‌نویسی رویدادمحور از این‌جا شروع می‌شود — و چت کلاسیک‌ترین کلاس آن است.',
    tips: [
      'Think in events: connection, message, join-room, leave — not request/response. Each maps to a small handler.',
      'Broadcast with a helper (room => send to every socket in it) so message, join, and leave all use the same path.',
      'Keep per-room history as a capped array (slice(-50)) and send it right after a client joins the room.',
    ],
    tipsFa: [
      'به رویدادها فکر کن: connection، message، join-room، leave — نه درخواست/پاسخ. هر کدام به یک handler کوچک نگاشت می‌شود.',
      'با یک helper broadcast کن (room یعنی ارسال به همهٔ socket های داخل آن) تا message، join و leave همه از یک مسیر رد شوند.',
      'تاریخچهٔ هر اتاق را به صورت آرایهٔ سقف‌دار (slice(-50)) نگه دار و بلافاصله بعد از پیوستن کلاینت بفرست.',
    ],
    codeExample: `import { WebSocketServer, WebSocket } from 'ws';
import http from 'http';

const server = http.createServer();
const wss = new WebSocketServer({ server });

const rooms = new Map<string, Set<WebSocket>>();
const history = new Map<string, { user: string; text: string; at: number }[]>();

wss.on('connection', (socket) => {
  let currentRoom: string | null = null;

  socket.on('message', (raw) => {
    const msg = JSON.parse(raw.toString());

    if (msg.type === 'join') {
      // TODO: کاربر را به اتاق msg.room اضافه کن و ورودش را broadcast کن
      // TODO: تاریخچه‌ی اتاق را برای این کلاینت بفرست
    }

    if (msg.type === 'message') {
      // TODO: پیام را در history اتاق ذخیره کن (با slice(-50))
      // TODO: پیام را به همه‌ی اعضای اتاق بفرست، به جز فرستنده (broadcast)
    }
  });

  socket.on('close', () => {
    // TODO: کاربر را از اتاق حذف کن و خروجش را به بقیه اطلاع بده
  });
});

server.listen(3000, () => console.log('Chat server on :3000'));`,
  },
  };