import type { Locale } from "./i18n";

export interface BlogPostContent {
  title: string;
  excerpt: string;
  body: string[];
}

export interface BlogPost {
  slug: string;
  /** ISO date, e.g. "2026-06-11" */
  date: string;
  content: Record<Locale, BlogPostContent>;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "credentials-and-faq-pages",
    date: "2026-06-11",
    content: {
      en: {
        title: "New on jdradiator.com: Credentials and FAQ pages",
        excerpt:
          "Two new resources for buyers and distributors: a Credentials page with our CE / EN 442 and UKCA documentation, and an FAQ covering the questions we hear most often.",
        body: [
          "We have added two new sections to our website to make supplier evaluation easier for buyers, importers and project partners.",
          "The Credentials page brings our certification documentation together in one place: CE / EN 442 certificates for panel and column radiators, UKCA test reports, 42 national patents and 12 registered trademarks.",
          "The FAQ page answers the questions we receive most often from B2B customers: certifications, OEM/ODM services, minimum order quantities, lead times and export markets.",
          "Both pages are available in English, Russian, Mongolian and Spanish. For specific documentation requests, please contact our sales team.",
        ],
      },
      ru: {
        title: "Новые разделы сайта: «Сертификаты» и FAQ",
        excerpt:
          "Два новых раздела для закупщиков и дистрибьюторов: документация CE / EN 442 и UKCA на странице «Сертификаты» и ответы на частые вопросы в FAQ.",
        body: [
          "Мы добавили на сайт два новых раздела, чтобы упростить оценку поставщика для закупщиков, импортёров и партнёров по проектам.",
          "Раздел «Сертификаты» объединяет документацию в одном месте: сертификаты CE / EN 442 на панельные и трубчатые радиаторы, протоколы испытаний UKCA, 42 патента и 12 зарегистрированных товарных знаков.",
          "В разделе FAQ — ответы на частые вопросы B2B-клиентов: сертификация, OEM/ODM-производство, минимальный объём заказа, сроки изготовления и рынки поставок.",
          "Разделы доступны на русском, английском, монгольском и испанском языках. За документами обращайтесь в отдел продаж.",
        ],
      },
      mn: {
        title: "Сайтад шинээр: «Гэрчилгээ» болон FAQ хуудас",
        excerpt:
          "Худалдан авагч, дистрибьютеруудад зориулсан хоёр шинэ хэсэг: CE / EN 442, UKCA баримт бичгийн «Гэрчилгээ» хуудас болон түгээмэл асуултын FAQ.",
        body: [
          "Худалдан авагч, импортлогч, төслийн түншүүдэд нийлүүлэгчийг үнэлэхэд хялбар болгох зорилгоор сайтад хоёр шинэ хэсэг нэмлээ.",
          "«Гэрчилгээ» хуудсанд баримт бичгийг нэг дор нэгтгэв: хавтан болон баганат радиаторын CE / EN 442 гэрчилгээ, UKCA туршилтын тайлан, 42 патент, 12 бүртгэлтэй барааны тэмдэг.",
          "FAQ хуудсанд B2B харилцагчдын түгээмэл асуултад хариуллаа: гэрчилгээ, OEM/ODM үйлчилгээ, захиалгын доод хэмжээ, үйлдвэрлэлийн хугацаа, экспортын зах зээл.",
          "Хуудсууд монгол, орос, англи, испани хэлээр үзэх боломжтой. Баримт бичгийн хүсэлтээ борлуулалтын багт илгээнэ үү.",
        ],
      },
      es: {
        title: "Novedades en jdradiator.com: páginas de Certificados y FAQ",
        excerpt:
          "Dos nuevos recursos para compradores y distribuidores: la página de Certificados con nuestra documentación CE / EN 442 y UKCA, y una sección de preguntas frecuentes.",
        body: [
          "Hemos añadido dos nuevas secciones a nuestro sitio web para facilitar la evaluación de proveedores a compradores, importadores y socios de proyecto.",
          "La página de Certificados reúne la documentación en un solo lugar: certificados CE / EN 442 para radiadores de panel y tubulares, informes de ensayo UKCA, 42 patentes y 12 marcas registradas.",
          "La página de FAQ responde a las preguntas más frecuentes de clientes B2B: certificaciones, servicios OEM/ODM, pedidos mínimos, plazos de producción y mercados de exportación.",
          "Ambas páginas están disponibles en español, inglés, ruso y mongol. Para solicitar documentación específica, contacte con nuestro equipo comercial.",
        ],
      },
    },
  },
  {
    slug: "radiator-cold-at-bottom",
    date: "2026-06-11",
    content: {
      ru: {
        title: "Почему низ радиатора холодный: причины и решения",
        excerpt:
          "Холодный низ радиатора — не всегда неисправность. Разбираем, когда это нормальная физика отопления, а когда — признак шлама, разбалансировки или ошибок подключения, и что делать в каждом случае.",
        body: [
          "Тёплый верх и заметно более холодный низ радиатора — одна из самых частых жалоб на систему отопления. Хорошая новость: во многих случаях это не поломка, а нормальная работа прибора. Плохая: в остальных причиной оказываются шлам, ошибки подключения или разбалансировка системы, которые со временем заметно снижают теплоотдачу. Разберём, как отличить одно от другого.",
          "## Когда холодный низ — это норма",
          "Радиатор отдаёт тепло по мере того, как теплоноситель проходит через него: вода входит горячей, охлаждается и уходит в обратку. В правильно настроенной системе перепад между подачей и обраткой составляет 15–20 °C, поэтому зона у выхода — как правило, нижний патрубок — всегда прохладнее зоны у входа. Это не дефект, а признак того, что прибор действительно отдаёт тепло в помещение.",
          "Второй штатный случай — работа термостатического клапана. Когда комната прогрета, клапан уменьшает проток: вода движется медленно и успевает остыть в нижней части прибора. Простой тест — откройте клапан на максимум. Если радиатор равномерно прогревается за 10–15 минут, неисправности нет.",
          "## Причина 1: шлам и отложения в нижнем коллекторе",
          "Если низ остаётся холодным даже при полностью открытом клапане, наиболее вероятная причина — внутри прибора. Продукты коррозии, ил и окалина тяжелее воды: они оседают в нижнем коллекторе и перекрывают циркуляцию по нижним каналам. Характерные симптомы: холодная горизонтальная полоса по всей нижней части, постепенное ухудшение нагрева за несколько сезонов, тёмная вода при сливе из системы.",
          "Решение — промывка. Лёгкие отложения удаляет гидравлическая промывка системы, плотный шлам требует демонтажа и прямой промывки прибора. Для профилактики на обратку перед котлом ставят грязевик и магнитный шламоотделитель — в системах с насосной циркуляцией это окупается продлением срока службы и котла, и радиаторов.",
          "## Причина 2: воздух — но симптом противоположный",
          "Завоздушивание часто называют первой причиной любых проблем с нагревом, однако важно не путать симптомы. Воздух легче воды и собирается в верхней части прибора: холодный верх при тёплом низе — вот признак воздушной пробки, которая удаляется краном Маевского. Холодный низ при горячем верхе на воздух почти никогда не указывает, и стравливание здесь не поможет.",
          "## Причина 3: низкий расход и разбалансировка системы",
          "В многоквартирном доме или разветвлённой системе частного дома приборы, ближние к насосу или стояку, «перетягивают» расход на себя. До дальних радиаторов вода доходит медленно, успевает остыть, и их нижняя часть остаётся прохладной. Узнать эту причину просто: проблема проявляется сразу на нескольких приборах и сильнее всего — на самых удалённых. Решение — гидравлическая балансировка: настройка балансировочных клапанов на ветках и, при необходимости, корректировка скорости циркуляционного насоса.",
          "## Причина 4: ошибки подключения",
          "При боковом одностороннем подключении длинного радиатора (примерно от 10–12 секций или от 1,5–2 м длины) теплоноситель идёт по «короткому пути» между ближними патрубками, и дальний нижний угол прогревается слабо. Лечится переходом на диагональную схему — подача сверху с одной стороны, обратка снизу с противоположной — или установкой удлинителя протока. Перепутанные подача и обратка на приборах с нижним подключением дают тот же эффект: сверяйте схему с паспортом изделия.",
          "## Диагностика за пять шагов",
          "1. Откройте термоклапан на максимум и подождите 15 минут. 2. Сравните на ощупь подачу и обратку: перепад заметно больше обычного говорит о недостаточном расходе. 3. Проверьте, затронут один прибор или несколько: один — смотрите подключение и шлам, несколько — балансировку. 4. Стравите воздух, чтобы исключить смешанную картину. 5. Если холодная полоса внизу осталась — планируйте промывку прибора.",
          "## Профилактика и выбор прибора",
          "Главная профилактика — качество теплоносителя: фильтр-грязевик, шламоотделитель и промывка системы при заметном загрязнении. Имеет значение и конструкция: стальные трубчатые радиаторы с полнопроходными вертикальными каналами менее чувствительны к шламу, чем приборы с узкими внутренними каналами. В [каталоге JIUDING](/ru/products) представлены стальные трубчатые и панельные радиаторы с рабочим давлением 1,0 МПа (10 атм); каждый прибор проходит заводское испытание давлением в 1,5 раза выше рабочего. Ответы на частые вопросы о подключении и эксплуатации — в [разделе FAQ](/ru/faq).",
        ],
      },
      en: {
        title: "Why Is the Bottom of a Radiator Cold? Causes and Solutions",
        excerpt:
          "A cold radiator bottom is not always a fault. We explain when it is normal heating physics — and when it signals sludge, poor balancing or piping errors, and what to do in each case.",
        body: [
          "A warm top and a noticeably colder bottom is one of the most common complaints about heating systems. The good news: in many cases it is not a defect but normal operation. The bad news: in the remaining cases the cause is sludge, piping errors or an unbalanced system, all of which gradually reduce heat output. Here is how to tell them apart.",
          "## When a cold bottom is normal",
          "A radiator releases heat as water passes through it: it enters hot, cools down and leaves through the return. In a properly set system the difference between flow and return is 15–20 °C, so the area near the outlet — usually the bottom connection — is always cooler than the inlet side. That is not a fault; it is proof the radiator is actually transferring heat to the room.",
          "The second normal case is thermostatic valve operation. Once the room is warm, the valve throttles the flow: water moves slowly and cools in the lower part of the radiator. A simple test — open the valve fully. If the radiator heats evenly within 10–15 minutes, nothing is wrong.",
          "## Cause 1: sludge in the bottom header",
          "If the bottom stays cold even with the valve fully open, the most likely cause is inside the radiator. Corrosion products, silt and scale are heavier than water: they settle in the bottom header and block circulation through the lower channels. Typical symptoms: a cold horizontal band along the entire bottom, gradually worsening performance over several seasons, and dark water when the system is drained.",
          "The solution is flushing. Light deposits are removed by a hydraulic power-flush of the system; dense sludge requires removing the radiator and flushing it directly. For prevention, fit a dirt separator and a magnetic filter on the return before the boiler — in pumped systems this pays off by extending the life of both boiler and radiators.",
          "## Cause 2: air — but the symptom is the opposite",
          "Trapped air is often blamed for every heating problem, but the symptoms must not be confused. Air is lighter than water and collects at the top of the radiator: a cold top with a warm bottom is the sign of an air lock, removed with a bleed valve. A cold bottom with a hot top almost never points to air, and bleeding will not help.",
          "## Cause 3: low flow rate and poor balancing",
          "In an apartment block or a branched single-family system, radiators close to the pump or riser \"steal\" the flow. Water reaches distant radiators slowly, cools on the way, and their lower part stays lukewarm. This cause is easy to recognise: the problem appears on several radiators at once and is worst on the most remote ones. The fix is hydraulic balancing — adjusting balancing valves on each branch and, if needed, the circulation pump speed.",
          "## Cause 4: connection errors",
          "With same-side lateral connection on a long radiator (roughly from 10–12 sections or 1.5–2 m of length), water takes the \"short path\" between the nearby connections and the far bottom corner barely warms up. The cure is a diagonal scheme — flow at the top on one side, return at the bottom on the opposite side — or a flow extender insert. Swapped flow and return on bottom-connection models produce the same effect: always check against the product datasheet.",
          "## Five-step diagnosis",
          "1. Open the thermostatic valve fully and wait 15 minutes. 2. Compare flow and return pipes by touch: a much larger difference than usual indicates insufficient flow. 3. Check whether one radiator is affected or several: one — inspect the connection and sludge; several — balance the system. 4. Bleed the air to rule out a mixed picture. 5. If the cold band at the bottom remains, plan a flush.",
          "## Prevention and radiator choice",
          "The main prevention is water quality: a strainer, a sludge separator and a system flush when contamination is visible. Design matters too: steel tubular radiators with full-bore vertical channels are less sensitive to sludge than radiators with narrow internal channels. The [JIUDING catalogue](/en/products) offers steel tubular and panel radiators with 1.0 MPa (10 bar) working pressure; every unit is factory-tested at 1.5× working pressure. Answers to common installation questions are in our [FAQ](/en/faq).",
        ],
      },
      mn: {
        title: "Радиаторын доод хэсэг яагаад хүйтэн байдаг вэ: шалтгаан ба шийдэл",
        excerpt:
          "Радиаторын доод хэсэг хүйтэн байх нь үргэлж гэмтэл биш. Хэзээ хэвийн үзэгдэл, хэзээ лаг хуримтлал, тэнцвэргүй систем эсвэл буруу холболтын шинж болохыг, тус бүрд нь юу хийхийг тайлбарлав.",
        body: [
          "Дээд хэсэг нь халуун, доод хэсэг нь мэдэгдэхүйц хүйтэн байх нь халаалтын системийн хамгийн түгээмэл гомдлын нэг. Сайн мэдээ: ихэнх тохиолдолд энэ нь эвдрэл биш, хэвийн ажиллагаа. Муу мэдээ: үлдсэн тохиолдолд лаг, буруу холболт эсвэл тэнцвэргүй систем шалтгаан болдог бөгөөд эдгээр нь дулаан өгөлтийг аажмаар бууруулдаг. Хэрхэн ялгахыг авч үзье.",
          "## Доод хэсэг хүйтэн байх нь хэвийн үе",
          "Ус радиатораар дамжин өнгөрөхдөө дулаанаа өгдөг: халуун орж ирээд, хөрж, буцах шугамаар гардаг. Зөв тохируулсан системд өгөх ба буцах шугамын температурын зөрүү 15–20 °C байдаг тул гаралтын хэсэг — ихэвчлэн доод холболт — оролтын талаас үргэлж сэрүүн байна. Энэ нь гэмтэл биш, харин радиатор өрөөнд дулаанаа үнэхээр өгч байгаагийн нотолгоо.",
          "Хоёр дахь хэвийн тохиолдол — термостат хавхлагын ажиллагаа. Өрөө дулаацмагц хавхлага урсгалыг багасгана: ус удаан хөдөлж, радиаторын доод хэсэгт хөрнө. Энгийн сорил — хавхлагыг бүрэн нээгээрэй. Радиатор 10–15 минутын дотор жигд халвал ямар ч асуудал байхгүй.",
          "## Шалтгаан 1: доод коллектор дахь лаг хуримтлал",
          "Хавхлага бүрэн нээлттэй байхад доод хэсэг хүйтэн хэвээр байвал шалтгаан нь радиаторын дотор байх магадлал өндөр. Зэврэлтийн бүтээгдэхүүн, шавар, хаг уснаас хүнд тул доод коллекторт тунаж, доод сувгуудын эргэлтийг хаадаг. Шинж тэмдэг: доод хэсгийн дагуух хүйтэн хэвтээ зурвас, хэдэн улирлын турш аажмаар муудах халаалт, системээс ус юүлэхэд бараан өнгөтэй гарах.",
          "Шийдэл — угаалга. Хөнгөн тунадсыг системийн гидравлик угаалгаар арилгана; нягт лагийг радиаторыг буулгаж шууд угаах шаардлагатай. Урьдчилан сэргийлэхийн тулд зуухны өмнөх буцах шугамд шүүлтүүр болон соронзон лаг баригч суурилуулдаг — энэ нь зуух, радиаторын аль алиных нь ашиглалтын хугацааг уртасгадаг.",
          "## Шалтгаан 2: агаар — гэхдээ шинж тэмдэг нь эсрэгээрээ",
          "Агаар хуримтлалыг бүх асуудлын эх гэж буруутгах нь элбэг ч шинж тэмдгийг андуурч болохгүй. Агаар уснаас хөнгөн тул радиаторын дээд хэсэгт хуримтлагдана: дээд хэсэг хүйтэн, доод хэсэг дулаахан байвал агаарын түгжрэл бөгөөд агаар гаргах хавхлагаар гаргана. Доод хэсэг хүйтэн, дээд хэсэг халуун байх нь агаартай бараг холбоогүй тул агаар гаргах нь тус болохгүй.",
          "## Шалтгаан 3: бага урсгал ба системийн тэнцвэргүй байдал",
          "Орон сууцны барилга эсвэл салаалсан системд насос буюу босоо шугамд ойр радиаторууд урсгалыг «булааж» авдаг. Алслагдсан радиаторт ус удаан хүрч, замдаа хөрч, доод хэсэг нь бүлээн үлддэг. Таних нь амархан: асуудал хэд хэдэн радиаторт зэрэг илэрч, хамгийн алслагдсан дээр нь хамгийн хүчтэй байдаг. Шийдэл — гидравлик тэнцвэржүүлэлт: салаа бүрийн тэнцвэржүүлэх хавхлагыг тохируулах, шаардлагатай бол насосны хурдыг өөрчлөх.",
          "## Шалтгаан 4: холболтын алдаа",
          "Урт радиаторыг (ойролцоогоор 10–12 секц буюу 1,5–2 м-ээс дээш) нэг талын хажуугийн холболтоор холбоход ус ойролцоох хоёр холболтын хооронд «богино замаар» урсаж, цаад доод булан сул халдаг. Засах арга — диагональ схем: өгөх шугамыг нэг талын дээд хэсэгт, буцахыг эсрэг талын доод хэсэгт холбох, эсвэл урсгал сунгагч суурилуулах. Доод холболттой загварт өгөх, буцах шугамыг солиход мөн адил үр дагавар гарна: бүтээгдэхүүний техникийн баримттай тулгаж шалгаарай.",
          "## Таван алхамт оношилгоо",
          "1. Термостат хавхлагыг бүрэн нээгээд 15 минут хүлээнэ. 2. Өгөх ба буцах хоолойг гараар харьцуулна: ердийнхөөс хамаагүй их зөрүү нь урсгал хүрэлцэхгүй байгааг илтгэнэ. 3. Нэг радиатор уу, олон уу гэдгийг шалгана: нэг бол холболт ба лаг, олон бол тэнцвэржүүлэлт. 4. Холимог дүр зургийг үгүйсгэхийн тулд агаарыг гаргана. 5. Доод хүйтэн зурвас хэвээр байвал угаалга төлөвлөнө.",
          "## Урьдчилан сэргийлэлт ба радиаторын сонголт",
          "Гол урьдчилан сэргийлэлт — усны чанар: шүүлтүүр, лаг баригч, бохирдол илэрвэл системийн угаалга. Хийц мөн чухал: бүрэн нэвт босоо суваг бүхий ган хоолойт радиатор нь нарийн дотоод сувагтай төхөөрөмжөөс лагт бага мэдрэмтгий. [JIUDING-ийн каталогт](/mn/products) 1,0 МПа (10 бар) ажлын даралттай ган хоолойт болон хавтан радиаторууд бий; төхөөрөмж бүр үйлдвэрт ажлын даралтаас 1,5 дахин өндөр даралтын туршилт давдаг. Холболт, ашиглалтын түгээмэл асуултын хариуг [FAQ хэсгээс](/mn/faq) үзнэ үү.",
        ],
      },
      es: {
        title: "¿Por qué la parte inferior del radiador está fría? Causas y soluciones",
        excerpt:
          "Que la parte baja del radiador esté fría no siempre es una avería. Explicamos cuándo es física normal de la calefacción y cuándo indica lodos, desequilibrio hidráulico o errores de conexión, y qué hacer en cada caso.",
        body: [
          "Una parte superior caliente y una inferior notablemente más fría es una de las quejas más habituales sobre los sistemas de calefacción. La buena noticia: en muchos casos no es un defecto, sino funcionamiento normal. La mala: en el resto, la causa son lodos, errores de conexión o un sistema desequilibrado, que reducen gradualmente la emisión de calor. Veamos cómo distinguirlos.",
          "## Cuándo es normal que la parte baja esté fría",
          "El radiador cede calor a medida que el agua lo atraviesa: entra caliente, se enfría y sale por el retorno. En un sistema bien ajustado la diferencia entre ida y retorno es de 15–20 °C, por lo que la zona próxima a la salida —normalmente la conexión inferior— siempre está más fría que la de entrada. No es un fallo: es la prueba de que el radiador realmente transfiere calor a la habitación.",
          "El segundo caso normal es el funcionamiento de la válvula termostática. Cuando la habitación alcanza la temperatura, la válvula reduce el caudal: el agua circula despacio y se enfría en la parte baja. Una prueba sencilla: abra la válvula al máximo. Si el radiador se calienta de forma uniforme en 10–15 minutos, no hay avería.",
          "## Causa 1: lodos en el colector inferior",
          "Si la parte baja sigue fría incluso con la válvula totalmente abierta, la causa más probable está dentro del radiador. Los productos de corrosión, el limo y la cascarilla pesan más que el agua: se depositan en el colector inferior y bloquean la circulación por los canales bajos. Síntomas típicos: una franja horizontal fría a lo largo de toda la base, rendimiento que empeora a lo largo de varias temporadas y agua oscura al vaciar el circuito.",
          "La solución es la limpieza. Los depósitos ligeros se eliminan con un lavado hidráulico del sistema; el lodo compacto exige desmontar el radiador y lavarlo directamente. Como prevención, instale un separador de lodos y un filtro magnético en el retorno antes de la caldera: en sistemas con bomba se amortiza alargando la vida de caldera y radiadores.",
          "## Causa 2: aire, pero con el síntoma contrario",
          "El aire atrapado suele culparse de cualquier problema, pero conviene no confundir los síntomas. El aire es más ligero que el agua y se acumula en la parte superior: una parte alta fría con la baja caliente es señal de bolsa de aire, que se elimina con el purgador. Una parte baja fría con la alta caliente casi nunca apunta al aire, y purgar no servirá.",
          "## Causa 3: caudal bajo y desequilibrio hidráulico",
          "En un edificio de viviendas o en una instalación ramificada, los radiadores cercanos a la bomba o al montante \"roban\" el caudal. El agua llega despacio a los radiadores lejanos, se enfría por el camino y su parte baja queda templada. Es fácil de reconocer: el problema aparece en varios radiadores a la vez y es peor en los más alejados. La solución es el equilibrado hidráulico: ajustar los detentores o válvulas de equilibrado de cada ramal y, si es necesario, la velocidad de la bomba.",
          "## Causa 4: errores de conexión",
          "Con conexión lateral por el mismo lado en un radiador largo (a partir de unos 10–12 elementos o 1,5–2 m), el agua toma el \"camino corto\" entre las conexiones próximas y la esquina inferior opuesta apenas se calienta. Se corrige con el esquema diagonal —ida arriba por un lado, retorno abajo por el opuesto— o con un alargador de flujo. Intercambiar ida y retorno en modelos de conexión inferior produce el mismo efecto: compruebe siempre la ficha técnica del producto.",
          "## Diagnóstico en cinco pasos",
          "1. Abra la válvula termostática al máximo y espere 15 minutos. 2. Compare al tacto la ida y el retorno: una diferencia mucho mayor de lo habitual indica caudal insuficiente. 3. Compruebe si afecta a un radiador o a varios: uno — revise conexión y lodos; varios — equilibre el sistema. 4. Purgue el aire para descartar un cuadro mixto. 5. Si la franja fría inferior persiste, planifique un lavado.",
          "## Prevención y elección del radiador",
          "La principal prevención es la calidad del agua: filtro, separador de lodos y lavado del circuito cuando haya suciedad visible. El diseño también importa: los radiadores tubulares de acero con canales verticales de paso total son menos sensibles a los lodos que los de canales internos estrechos. El [catálogo JIUDING](/es/products) ofrece radiadores tubulares y de panel de acero con presión de trabajo de 1,0 MPa (10 bar); cada unidad se prueba en fábrica a 1,5 veces la presión de trabajo. Las respuestas a las dudas de instalación más frecuentes están en nuestro [FAQ](/es/faq).",
        ],
      },
    },
  },
  {
    slug: "radiator-working-and-test-pressure",
    date: "2026-06-11",
    content: {
      ru: {
        title: "Рабочее и испытательное давление радиатора: что означают 15 и 25 атм",
        excerpt:
          "В характеристиках радиаторов встречаются «15 атм», «25 атм», «1,0 МПа», «10 бар» — разбираем, что такое рабочее и испытательное давление, как пересчитывать единицы и какой запас нужен для квартиры и частного дома.",
        body: [
          "В паспортах и каталогах радиаторов давление указывают по-разному: один производитель пишет «рабочее 15 атм, испытательное 25 атм», другой — «1,0 МПа», третий — «10 бар». Для закупщика и проектировщика это один из ключевых параметров выбора, поэтому разберём, что стоит за каждой цифрой и как сравнивать приборы между собой.",
          "## Что такое рабочее давление",
          "Рабочее давление — это давление теплоносителя, при котором прибор рассчитан эксплуатироваться постоянно, весь срок службы. Оно должно быть выше максимального давления в вашей системе отопления с учётом скачков. Ориентиры по системам: автономное отопление частного дома — обычно 1,5–3 атм; малоэтажные дома с ИТП — 4–6 атм; центральное отопление многоэтажки — 6–10 атм, причём при опрессовке и гидроударах кратковременные значения бывают заметно выше.",
          "## Что такое испытательное давление",
          "Испытательное (опрессовочное) давление — это давление, при котором прибор проверяют на прочность и герметичность. Здесь важно различать два разных испытания. Первое — заводское: каждый прибор или партия проверяется изготовителем с нормированным запасом к рабочему давлению. Второе — опрессовка системы при сдаче в эксплуатацию или после ремонта: коммунальные службы испытывают сеть давлением выше рабочего, как правило в 1,25–1,5 раза. Радиатор должен выдерживать именно опрессовку системы, а не только её повседневный режим.",
          "## Откуда берутся «15 и 25 атм»",
          "Связка «15/25 атм» — типичная маркировка стальных трубчатых радиаторов на рынке СНГ: 15 атм — максимальное рабочее давление, 25 атм — давление заводского испытания. Сами по себе большие цифры не означают, что прибор «лучше»: они означают, что он рассчитан на высотные дома с центральным отоплением, где давление в нижних этажах высокое, а гидроудары вероятны. Для коттеджа с закрытой системой и давлением 2 атм такой запас избыточен — там решают теплоотдача, габариты и качество покрытия.",
          "## МПа, бар, атм: как пересчитывать",
          "Производители используют три единицы, и путаница между ними — частая причина ошибок в спецификациях. Запомнить просто: 1 МПа = 10 бар ≈ 10,2 атм; на практике бар и атмосферу считают равными, разница менее 2 %. То есть «1,0 МПа», «10 бар» и «10 атм» — это одно и то же давление. В российской документации ГОСТ оперирует МПа, а торговые каталоги — атмосферами, поэтому на [страницах продукции JIUDING](/ru/products) для российского рынка давление указано сразу в двух единицах: МПа и атм.",
          "## Как выбрать радиатор по давлению",
          "Алгоритм короткий. 1. Узнайте рабочее давление вашей системы — у управляющей компании или проектировщика. 2. Уточните давление опрессовки сети. 3. Рабочее давление радиатора должно быть не ниже давления опрессовки системы. Для частного дома достаточно 6–10 атм с большим запасом; для центрального отопления многоэтажек смотрите на приборы от 10 атм рабочего давления и подтверждённым заводским испытанием; для особо нагруженных объектов существуют усиленные серии, например медно-алюминиевые приборы с рабочим давлением 1,6 МПа (16 атм).",
          "## Частые заблуждения",
          "Первое: «испытательное давление — это запас для работы». Нет: эксплуатировать прибор выше рабочего давления нельзя; испытательное давление прибор выдерживает кратковременно и без остаточных деформаций, но это режим проверки, а не эксплуатации. Второе: «чем выше цифры давления, тем дольше срок службы». Прямой связи нет — на ресурс сильнее влияют качество стали, сварных швов и теплоносителя. Третье: «в частном доме давление не важно». Важно: при заполнении и опрессовке системы давление кратковременно поднимают, а гидроудар при резком закрытии арматуры возможен и в коттедже.",
          "## Как испытывает JIUDING",
          "На заводе JIUDING каждый прибор — не выборочно, а каждый — проходит гидравлическое испытание давлением в 1,5 раза выше рабочего: для серий с рабочим давлением 1,0 МПа (10 атм) это 1,5 МПа (≈15 атм). Испытание входит в многоступенчатый контроль качества по ISO 9001, а тепловые характеристики приборов подтверждены испытаниями по европейскому стандарту EN 442. Протоколы испытаний и сертификаты доступны в [центре документации](/ru/documents), сводка по сертификатам — в разделе [«Сертификаты»](/ru/credentials).",
          "Если вы подбираете приборы под конкретный объект — многоэтажный дом, гостиницу или коттеджный посёлок, — пришлите нам параметры системы: рабочее давление, температурный график и тип подключения. Подберём серию с нужным запасом по давлению из 600+ типоразмеров.",
        ],
      },
      en: {
        title: "Radiator Working Pressure vs Test Pressure: What 15 and 25 atm Actually Mean",
        excerpt:
          "Radiator datasheets quote \"15 atm\", \"25 atm\", \"1.0 MPa\" or \"10 bar\". We explain working vs test pressure, how to convert the units, and what margin you need for apartments and single-family homes.",
        body: [
          "Radiator datasheets and catalogues state pressure in different ways: one manufacturer writes \"working 15 atm, test 25 atm\", another \"1.0 MPa\", a third \"10 bar\". For buyers and system designers this is one of the key selection parameters, so let us unpack what each figure means and how to compare products.",
          "## What working pressure is",
          "Working pressure is the water pressure at which the radiator is designed to operate continuously throughout its service life. It must exceed the maximum pressure of your heating system, including surges. Typical reference points: an autonomous system in a single-family house — usually 1.5–3 atm; low-rise buildings with a substation — 4–6 atm; district heating in a high-rise — 6–10 atm, with short-term peaks during pressure testing and water hammer noticeably higher.",
          "## What test pressure is",
          "Test pressure is the pressure at which strength and tightness are verified. Two different tests should be distinguished. The first is the factory test: the manufacturer checks the product with a standardised margin above working pressure. The second is the commissioning pressure test of the system itself, after installation or repairs: utilities typically test the network at 1.25–1.5 times working pressure. A radiator must withstand the system pressure test, not just everyday operation.",
          "## Where \"15 and 25 atm\" come from",
          "The \"15/25 atm\" pair is the typical labelling of steel tubular radiators on CIS markets: 15 atm is the maximum working pressure, 25 atm the factory test pressure. Big numbers do not automatically mean a \"better\" radiator: they mean it is designed for high-rise district heating, where pressure on the lower floors is high and water hammer is likely. For a cottage with a closed 2 atm system such a margin is unnecessary — there, heat output, dimensions and coating quality decide.",
          "## MPa, bar, atm: how to convert",
          "Manufacturers use three units, and mixing them up is a common source of specification errors. The rule is simple: 1 MPa = 10 bar ≈ 10.2 atm; in practice bar and atmosphere are treated as equal, the difference is under 2%. So \"1.0 MPa\", \"10 bar\" and \"10 atm\" are the same pressure. Russian GOST documentation uses MPa while trade catalogues use atmospheres, which is why [JIUDING product pages](/en/products) for the Russian market show pressure in both units, MPa and atm.",
          "## Choosing a radiator by pressure",
          "The algorithm is short. 1. Find out your system's working pressure from the building manager or designer. 2. Ask for the network's pressure-test value. 3. The radiator's working pressure must be no lower than the system test pressure. For a private house, 6–10 atm leaves a generous margin; for high-rise district heating look at radiators rated from 10 atm working pressure with a documented factory test; for especially demanding projects there are reinforced series, for example copper-aluminium radiators rated 1.6 MPa (16 atm).",
          "## Common misconceptions",
          "First: \"test pressure is usable operating headroom\". No: a radiator must not be operated above its working pressure; it withstands test pressure briefly and without permanent deformation, but that is a verification mode, not an operating one. Second: \"higher pressure figures mean longer service life\". There is no direct link — steel quality, weld quality and water chemistry matter far more for longevity. Third: \"pressure does not matter in a private house\". It does: pressure is briefly raised when filling and testing the system, and water hammer from a quickly closed valve can occur in a cottage too.",
          "## How JIUDING tests",
          "At the JIUDING factory every single unit — not a sample — undergoes a hydraulic test at 1.5 times working pressure: for series rated 1.0 MPa (10 atm) that means 1.5 MPa (≈15 atm). The test is part of multi-stage ISO 9001 quality control, and thermal performance is verified to the European EN 442 standard. Test reports and certificates are available in our [documentation centre](/en/documents), with a summary on the [Credentials page](/en/credentials).",
          "If you are specifying radiators for a particular project — a high-rise, hotel or housing development — send us the system parameters: working pressure, temperature regime and connection type. We will match a series with the right pressure margin from over 600 specifications.",
        ],
      },
      mn: {
        title: "Радиаторын ажлын ба туршилтын даралт: 15 ба 25 атм гэж юу гэсэн үг вэ",
        excerpt:
          "Радиаторын үзүүлэлтэд «15 атм», «25 атм», «1,0 МПа», «10 бар» гэж янз бүрээр бичигддэг. Ажлын ба туршилтын даралт гэж юу болох, нэгжүүдийг хэрхэн хөрвүүлэх, орон сууц ба хувийн сууцанд ямар нөөц хэрэгтэйг тайлбарлав.",
        body: [
          "Радиаторын паспорт, каталогид даралтыг өөр өөрөөр бичдэг: нэг үйлдвэрлэгч «ажлын 15 атм, туршилтын 25 атм», нөгөө нь «1,0 МПа», гурав дахь нь «10 бар» гэдэг. Худалдан авагч, зураг төсөл зохиогчдод энэ бол сонголтын гол үзүүлэлтүүдийн нэг тул тоо бүрийн цаана юу байгааг, бүтээгдэхүүнийг хэрхэн харьцуулахыг авч үзье.",
          "## Ажлын даралт гэж юу вэ",
          "Ажлын даралт гэдэг нь радиатор ашиглалтын бүх хугацаанд тогтмол ажиллахаар тооцоологдсон даралт юм. Энэ нь таны халаалтын системийн хамгийн их даралтаас, огцом өсөлтийг оруулаад, өндөр байх ёстой. Жишээ баримжаа: хувийн сууцны бие даасан систем — ихэвчлэн 1,5–3 атм; дэд станцтай нам барилга — 4–6 атм; өндөр барилгын төвлөрсөн халаалт — 6–10 атм бөгөөд даралтын туршилт, гидравлик цохилтын үед түр зуурын утга мэдэгдэхүйц өндөр гарч болно.",
          "## Туршилтын даралт гэж юу вэ",
          "Туршилтын даралт нь бат бэх, нягт битүүмжлэлийг шалгадаг даралт юм. Хоёр өөр туршилтыг ялгах хэрэгтэй. Эхнийх нь үйлдвэрийн туршилт: үйлдвэрлэгч бүтээгдэхүүнийг ажлын даралтаас тогтоосон нөөцөөр өндөр даралтаар шалгана. Хоёр дахь нь системийг ашиглалтад өгөх буюу засварын дараах даралтын туршилт: сүлжээг ихэвчлэн ажлын даралтаас 1,25–1,5 дахин өндөр даралтаар шалгадаг. Радиатор өдөр тутмын горимыг төдийгүй системийн даралтын туршилтыг давах чадвартай байх ёстой.",
          "## «15 ба 25 атм» хаанаас гардаг вэ",
          "«15/25 атм» хослол нь ТУХН-ийн зах зээл дэх ган хоолойт радиаторын түгээмэл тэмдэглэгээ: 15 атм нь хамгийн их ажлын даралт, 25 атм нь үйлдвэрийн туршилтын даралт. Том тоо нь радиаторыг «илүү сайн» гэсэн үг биш: энэ нь доод давхрын даралт өндөр, гидравлик цохилт магадлалтай өндөр барилгын төвлөрсөн халаалтад зориулагдсан гэсэн үг. 2 атм даралттай битүү системтэй хувийн сууцанд ийм нөөц илүүц — тэнд дулаан өгөлт, хэмжээ, бүрхүүлийн чанар шийднэ.",
          "## МПа, бар, атм: хэрхэн хөрвүүлэх вэ",
          "Үйлдвэрлэгчид гурван нэгж хэрэглэдэг бөгөөд тэдгээрийг хольж андуурах нь техникийн тодорхойлолтын алдааны түгээмэл шалтгаан. Дүрэм энгийн: 1 МПа = 10 бар ≈ 10,2 атм; практикт бар ба атмосферийг тэнцүү гэж үздэг, зөрүү нь 2 %-иас бага. Өөрөөр хэлбэл «1,0 МПа», «10 бар», «10 атм» нь нэг ижил даралт. [JIUDING-ийн бүтээгдэхүүний хуудсуудад](/mn/products) даралтыг олон улсын нэгжээр тодорхой зааж өгсөн.",
          "## Даралтаар нь радиатор хэрхэн сонгох вэ",
          "Алгоритм богино. 1. Системийнхээ ажлын даралтыг барилгын менежер эсвэл зураг төсөл зохиогчоос лавлана. 2. Сүлжээний даралтын туршилтын утгыг тодруулна. 3. Радиаторын ажлын даралт системийн туршилтын даралтаас багагүй байх ёстой. Хувийн сууцанд 6–10 атм нь их нөөцтэй хүрэлцээтэй; өндөр барилгын төвлөрсөн халаалтад ажлын даралт нь 10 атм-аас дээш, үйлдвэрийн туршилт нь баримтжсан радиатор сонгоно; онцгой ачаалалтай төсөлд 1,6 МПа (16 атм) ажлын даралттай зэс-хөнгөн цагаан зэрэг хүчитгэсэн цуврал бий.",
          "## Түгээмэл буруу ойлголтууд",
          "Нэгдүгээрт: «туршилтын даралт бол ашиглалтын нөөц». Үгүй: радиаторыг ажлын даралтаас дээш горимд ашиглаж болохгүй; туршилтын даралтыг төхөөрөмж богино хугацаанд, үлдэгдэл хэв гажилтгүй даадаг ч энэ нь шалгалтын горим болохоос ашиглалтын горим биш. Хоёрдугаарт: «даралтын тоо өндөр байх тусам удаан эдэлгээтэй». Шууд хамаарал байхгүй — эдэлгээнд гангийн чанар, гагнуурын чанар, усны найрлага хамаагүй их нөлөөлдөг. Гуравдугаарт: «хувийн сууцанд даралт хамаагүй». Хамаатай: системийг дүүргэх, турших үед даралтыг түр өсгөдөг бөгөөд хаалтыг огцом хаахад үүсэх гидравлик цохилт зуслангийн байшинд ч тохиолдож болно.",
          "## JIUDING хэрхэн турших вэ",
          "JIUDING-ийн үйлдвэрт түүвэрлэлт биш, төхөөрөмж бүр ажлын даралтаас 1,5 дахин өндөр даралтаар гидравлик туршилт давдаг: 1,0 МПа (10 атм) ажлын даралттай цувралд энэ нь 1,5 МПа (≈15 атм). Туршилт нь ISO 9001-ийн олон шатлалт чанарын хяналтын нэг хэсэг бөгөөд дулааны үзүүлэлт нь Европын EN 442 стандартаар баталгаажсан. Туршилтын тайлан, гэрчилгээг [баримт бичгийн төвөөс](/mn/documents), товч мэдээллийг [«Гэрчилгээ» хуудаснаас](/mn/credentials) үзнэ үү.",
          "Тодорхой төсөлд — өндөр барилга, зочид буудал, хороолол — радиатор сонгож байгаа бол системийн үзүүлэлтээ бидэнд илгээгээрэй: ажлын даралт, температурын горим, холболтын төрөл. 600+ төрлийн хэмжээнээс шаардлагатай даралтын нөөцтэй цувралыг санал болгоно.",
        ],
      },
      es: {
        title: "Presión de trabajo y presión de prueba del radiador: qué significan 15 y 25 atm",
        excerpt:
          "Las fichas técnicas indican «15 atm», «25 atm», «1,0 MPa» o «10 bar». Explicamos qué son la presión de trabajo y la de prueba, cómo convertir las unidades y qué margen necesita cada tipo de instalación.",
        body: [
          "Las fichas y catálogos de radiadores expresan la presión de formas distintas: un fabricante escribe «trabajo 15 atm, prueba 25 atm», otro «1,0 MPa» y un tercero «10 bar». Para compradores y proyectistas es uno de los parámetros clave de selección, así que veamos qué hay detrás de cada cifra y cómo comparar productos.",
          "## Qué es la presión de trabajo",
          "La presión de trabajo es aquella a la que el radiador está diseñado para funcionar de forma continua durante toda su vida útil. Debe superar la presión máxima de su sistema de calefacción, incluidas las puntas. Referencias habituales: instalación autónoma de una vivienda unifamiliar — normalmente 1,5–3 atm; edificios bajos con subestación — 4–6 atm; calefacción urbana en edificios altos — 6–10 atm, con picos transitorios notablemente mayores durante pruebas de presión y golpes de ariete.",
          "## Qué es la presión de prueba",
          "La presión de prueba es aquella con la que se verifican la resistencia y la estanqueidad. Conviene distinguir dos ensayos distintos. El primero es el de fábrica: el fabricante comprueba el producto con un margen normalizado sobre la presión de trabajo. El segundo es la prueba de presión de la instalación al ponerla en servicio o tras una reparación: la red se ensaya habitualmente a 1,25–1,5 veces la presión de trabajo. El radiador debe soportar la prueba de la instalación, no solo el régimen diario.",
          "## De dónde salen los «15 y 25 atm»",
          "El par «15/25 atm» es el etiquetado típico de los radiadores tubulares de acero en los mercados de la CEI: 15 atm es la presión máxima de trabajo y 25 atm la de prueba en fábrica. Las cifras altas no significan por sí mismas un radiador «mejor»: significan que está pensado para calefacción urbana en edificios altos, donde la presión en las plantas bajas es elevada. Para un chalet con circuito cerrado a 2 atm ese margen es innecesario: allí deciden la potencia, las dimensiones y la calidad del acabado.",
          "## MPa, bar, atm: cómo convertir",
          "Los fabricantes usan tres unidades y confundirlas es una fuente habitual de errores en especificaciones. La regla es simple: 1 MPa = 10 bar ≈ 10,2 atm; en la práctica bar y atmósfera se consideran equivalentes, la diferencia es inferior al 2 %. Es decir, «1,0 MPa», «10 bar» y «10 atm» son la misma presión. Las [páginas de producto de JIUDING](/es/products) indican la presión en las unidades habituales de cada mercado.",
          "## Cómo elegir el radiador según la presión",
          "El algoritmo es corto. 1. Averigüe la presión de trabajo de su sistema con el administrador del edificio o el proyectista. 2. Pregunte por la presión de prueba de la red. 3. La presión de trabajo del radiador no debe ser inferior a la presión de prueba de la instalación. Para una vivienda unifamiliar, 6–10 atm deja un margen sobrado; para calefacción urbana en altura, busque radiadores desde 10 atm de presión de trabajo con ensayo de fábrica documentado; para proyectos especialmente exigentes existen series reforzadas, como los radiadores de cobre-aluminio de 1,6 MPa (16 atm).",
          "## Errores de concepto frecuentes",
          "Primero: «la presión de prueba es margen utilizable de funcionamiento». No: un radiador no debe funcionar por encima de su presión de trabajo; soporta la presión de prueba brevemente y sin deformación permanente, pero es un régimen de verificación, no de servicio. Segundo: «cifras de presión más altas significan más vida útil». No hay relación directa: la calidad del acero, de las soldaduras y del agua influyen mucho más. Tercero: «en una vivienda unifamiliar la presión no importa». Sí importa: al llenar y probar la instalación la presión se eleva temporalmente, y el golpe de ariete por cerrar una válvula con rapidez también ocurre en un chalet.",
          "## Cómo ensaya JIUDING",
          "En la fábrica de JIUDING cada unidad —no una muestra— pasa una prueba hidráulica a 1,5 veces la presión de trabajo: para las series de 1,0 MPa (10 atm) son 1,5 MPa (≈15 atm). El ensayo forma parte del control de calidad en varias etapas según ISO 9001, y el rendimiento térmico está verificado conforme a la norma europea EN 442. Los informes de ensayo y certificados están en nuestro [centro de documentación](/es/documents), con un resumen en la página de [Certificados](/es/credentials).",
          "Si está especificando radiadores para un proyecto concreto —un edificio en altura, un hotel o una promoción— envíenos los parámetros del sistema: presión de trabajo, régimen de temperaturas y tipo de conexión. Le propondremos la serie con el margen de presión adecuado entre más de 600 especificaciones.",
        ],
      },
    },
  },
  {
    slug: "low-temperature-radiators-heat-pumps",
    date: "2026-06-11",
    content: {
      es: {
        title: "Radiadores de baja temperatura y aerotermia: guía de compatibilidad",
        excerpt:
          "¿Funcionan los radiadores con una bomba de calor? Sí, si se dimensionan para baja temperatura. Explicamos qué es ΔT30, por qué el COP depende de la temperatura de impulsión y cómo elegir radiadores compatibles con aerotermia.",
        body: [
          "La aerotermia se ha convertido en la opción de referencia para sustituir calderas en España, impulsada por la rehabilitación energética y la electrificación de la calefacción. Pero surge siempre la misma duda: ¿puedo mantener radiadores con una bomba de calor, o estoy obligado a instalar suelo radiante? La respuesta corta: los radiadores funcionan perfectamente con aerotermia si se dimensionan para baja temperatura. La larga, a continuación.",
          "## Por qué la aerotermia cambia las reglas",
          "Una caldera de gas trabaja cómodamente con agua a 70–80 °C. Una bomba de calor aire-agua, en cambio, alcanza su mejor rendimiento con impulsión a 35–45 °C: por cada grado que baja la temperatura de impulsión, el COP mejora en torno a un 2–3 %. Hacer trabajar la aerotermia a 60 °C es posible, pero penaliza el consumo eléctrico precisamente en los días más fríos. Por eso el sistema de emisión —los radiadores— debe poder ceder el calor necesario con agua mucho menos caliente.",
          "## Qué es ΔT30 y por qué importa",
          "La potencia de un radiador se ensaya según la norma EN 442 con un salto térmico ΔT50: temperatura media del agua 50 °C por encima del aire de la habitación (régimen 75/65/20). Con aerotermia, el agua circula a unos 40–45 °C de media en una habitación a 20 °C, es decir, un ΔT de unos 25–30 K. La emisión no cae de forma proporcional sino exponencial: según la ecuación característica del radiador, con n ≈ 1,3 para emisores de acero, a ΔT30 un radiador entrega aproximadamente el 51 % de su potencia nominal a ΔT50. Un radiador de 2000 W nominales aporta unos 1030 W con aerotermia.",
          "## ¿Sirven los radiadores de acero con bomba de calor?",
          "Sí, y con una ventaja específica: el acero permite fabricar emisores de gran superficie —paneles tipo 22 y 33, tubulares de varias columnas, modelos verticales de hasta 1800–2000 mm— que compensan el menor salto térmico con más área de emisión. La regla práctica del instalador: para pasar de caldera a aerotermia sin tocar la distribución, la superficie de radiador instalada debe aproximadamente duplicarse respecto a un dimensionado clásico a ΔT50. En reformas, muchas veces basta con sustituir los radiadores más justos por modelos de mayor profundidad (un tipo 22 en lugar de un tipo 11) conservando el mismo hueco.",
          "## Cómo dimensionar paso a paso",
          "Primero, calcule la carga térmica de cada habitación (en una vivienda media española, entre 60 y 110 W/m² según zona climática y aislamiento). Segundo, decida la temperatura de impulsión de diseño de la bomba de calor: cuanto más baja, mejor COP. Tercero, seleccione cada radiador por su potencia a ΔT30, no a ΔT50. Para facilitar este paso, las [páginas de producto de JIUDING](/es/products) muestran la emisión en ambos regímenes, ΔT50 y ΔT30, calculada con el exponente característico n = 1,3. Así el instalador compara directamente sin rehacer la conversión.",
          "## Radiadores frente a suelo radiante en rehabilitación",
          "El suelo radiante es un emisor excelente para obra nueva, pero en rehabilitación implica levantar pavimentos, recrecidos de varios centímetros y semanas de obra. Sustituir radiadores es una intervención de horas por estancia, sin afectar a la altura libre ni al pavimento. Con radiadores correctamente dimensionados a baja temperatura, la aerotermia alcanza rendimientos estacionales comparables en la mayoría de viviendas existentes, y el sistema conserva una ventaja: la inercia baja, que permite respuestas rápidas a los cambios de consigna.",
          "## Qué pedir al fabricante",
          "Antes de especificar, solicite tres cosas: la declaración de potencia conforme a EN 442 con los valores de Km y n del modelo, la potencia a ΔT30 además de la nominal, y la presión de trabajo (los radiadores de acero JIUDING operan a 1,0 MPa / 10 bar, con cada unidad probada en fábrica a 1,5 veces la presión de trabajo). Los informes de ensayo y certificados CE están disponibles en nuestro [centro de documentación](/es/documents), y las dudas habituales sobre pedidos y plazos se responden en el [FAQ](/es/faq).",
        ],
      },
      en: {
        title: "Low-Temperature Radiators and Heat Pumps: A Compatibility Guide",
        excerpt:
          "Do radiators work with a heat pump? Yes — if they are sized for low temperature. We explain what ΔT30 means, why COP depends on flow temperature and how to choose heat-pump-ready radiators.",
        body: [
          "Air-to-water heat pumps have become the default choice for boiler replacement in Spain and much of Europe, driven by energy renovation programmes and the electrification of heating. The same question always comes up: can I keep radiators with a heat pump, or am I forced to install underfloor heating? The short answer: radiators work perfectly with a heat pump if they are sized for low temperature. The long answer follows.",
          "## Why heat pumps change the rules",
          "A gas boiler is comfortable running water at 70–80 °C. An air-to-water heat pump reaches its best efficiency at 35–45 °C flow: for every degree the flow temperature drops, COP improves by roughly 2–3%. Running a heat pump at 60 °C is possible, but it penalises electricity consumption precisely on the coldest days. That is why the emitters — the radiators — must be able to deliver the required heat with much cooler water.",
          "## What ΔT30 is and why it matters",
          "Radiator output is tested under EN 442 at ΔT50: mean water temperature 50 °C above room air (75/65/20 regime). With a heat pump, water circulates at about 40–45 °C mean in a 20 °C room — a ΔT of roughly 25–30 K. Output does not fall proportionally but exponentially: by the radiator characteristic equation, with n ≈ 1.3 for steel emitters, at ΔT30 a radiator delivers about 51% of its nominal ΔT50 output. A radiator rated 2000 W nominal provides about 1030 W with a heat pump.",
          "## Do steel radiators work with heat pumps?",
          "Yes — with a specific advantage: steel allows large-surface emitters — type 22 and 33 panels, multi-column tubulars, vertical models up to 1800–2000 mm — that compensate the smaller temperature difference with more emission area. The installer's rule of thumb: to switch from boiler to heat pump without touching the pipework, installed radiator surface should roughly double compared with classic ΔT50 sizing. In renovations it is often enough to replace the most marginal radiators with deeper models (a type 22 instead of a type 11) in the same wall space.",
          "## Sizing step by step",
          "First, calculate each room's heat load (in an average Spanish dwelling, 60–110 W/m² depending on climate zone and insulation). Second, choose the heat pump's design flow temperature: the lower, the better the COP. Third, select each radiator by its ΔT30 output, not ΔT50. To make this easier, [JIUDING product pages](/en/products) show output at both regimes, ΔT50 and ΔT30, calculated with the characteristic exponent n = 1.3 — installers can compare directly without redoing the conversion.",
          "## Radiators vs underfloor heating in renovation",
          "Underfloor heating is an excellent emitter for new builds, but in renovation it means lifting floors, several centimetres of screed and weeks of work. Replacing radiators takes hours per room, with no impact on ceiling height or flooring. With radiators correctly sized for low temperature, a heat pump reaches comparable seasonal efficiency in most existing homes — and the system keeps one advantage: low thermal inertia and fast response to setpoint changes.",
          "## What to ask the manufacturer",
          "Before specifying, request three things: the EN 442 output declaration with the model's Km and n values, the ΔT30 output alongside the nominal figure, and the working pressure (JIUDING steel radiators operate at 1.0 MPa / 10 bar, with every unit factory-tested at 1.5× working pressure). Test reports and CE certificates are available in our [documentation centre](/en/documents), and common questions about orders and lead times are answered in the [FAQ](/en/faq).",
        ],
      },
      ru: {
        title: "Низкотемпературные радиаторы и тепловые насосы: гид по совместимости",
        excerpt:
          "Работают ли радиаторы с тепловым насосом? Да — если они подобраны под низкотемпературный режим. Объясняем, что такое ΔT30, почему COP зависит от температуры подачи и как выбрать совместимые приборы.",
        body: [
          "Воздушно-водяные тепловые насосы стали стандартным решением при замене котлов в Испании и Европе — этому способствуют программы энергомодернизации и электрификация отопления. Вопрос всегда один: можно ли оставить радиаторы с тепловым насосом или придётся монтировать тёплый пол? Короткий ответ: радиаторы отлично работают с тепловым насосом, если подобраны под низкотемпературный режим. Подробный — ниже.",
          "## Почему тепловой насос меняет правила",
          "Газовый котёл спокойно работает с водой 70–80 °C. Воздушно-водяной тепловой насос выходит на максимальную эффективность при подаче 35–45 °C: каждый градус снижения температуры подачи улучшает COP примерно на 2–3 %. Заставить насос греть до 60 °C можно, но расход электроэнергии вырастет именно в самые холодные дни. Поэтому отопительные приборы должны отдавать нужное тепло при заметно более прохладной воде.",
          "## Что такое ΔT30 и почему это важно",
          "Мощность радиатора испытывается по EN 442 при ΔT50: средняя температура воды на 50 °C выше воздуха в помещении (режим 75/65/20). С тепловым насосом вода циркулирует со средней температурой около 40–45 °C при 20 °C в комнате — это ΔT порядка 25–30 K. Теплоотдача падает не пропорционально, а по степенному закону: согласно характеристическому уравнению радиатора при n ≈ 1,3 для стальных приборов, при ΔT30 радиатор отдаёт около 51 % номинальной мощности при ΔT50. Прибор с номиналом 2000 Вт даст с тепловым насосом около 1030 Вт.",
          "## Подходят ли стальные радиаторы для тепловых насосов?",
          "Да, и у стали есть конкретное преимущество: из неё можно делать приборы большой площади — панельные типов 22 и 33, трубчатые с несколькими колонками, вертикальные модели высотой до 1800–2000 мм, — которые компенсируют меньший температурный напор большей поверхностью теплоотдачи. Практическое правило монтажника: при переходе с котла на тепловой насос без переделки разводки площадь установленных радиаторов должна примерно удвоиться по сравнению с классическим подбором при ΔT50. При реконструкции часто достаточно заменить самые «впритык» подобранные приборы на более глубокие (тип 22 вместо типа 11) в том же габарите.",
          "## Подбор по шагам",
          "Сначала рассчитайте теплопотери каждой комнаты (для среднего испанского жилья — 60–110 Вт/м² в зависимости от климатической зоны и утепления). Затем выберите расчётную температуру подачи теплового насоса: чем ниже, тем выше COP. Наконец, подбирайте каждый прибор по мощности при ΔT30, а не ΔT50. Чтобы упростить этот шаг, на [страницах продукции JIUDING](/ru/products) теплоотдача указана для обоих режимов — ΔT50 и ΔT30, рассчитанная с характеристическим показателем n = 1,3.",
          "## Радиаторы или тёплый пол при реконструкции",
          "Тёплый пол — отличный прибор для нового строительства, но при реконструкции он означает демонтаж покрытий, стяжку в несколько сантиметров и недели работ. Замена радиаторов — часы на комнату, без потери высоты потолка. При корректном низкотемпературном подборе тепловой насос с радиаторами достигает сопоставимой сезонной эффективности в большинстве существующих домов, а у системы остаётся плюс: низкая инерционность и быстрый отклик на изменение уставки.",
          "## Что запросить у производителя",
          "Перед спецификацией запросите три вещи: декларацию мощности по EN 442 со значениями Km и n модели, мощность при ΔT30 в дополнение к номинальной и рабочее давление (стальные радиаторы JIUDING работают при 1,0 МПа / 10 атм, каждый прибор проходит заводское испытание давлением в 1,5 раза выше рабочего). Протоколы испытаний и сертификаты CE доступны в [центре документации](/ru/documents), ответы на частые вопросы о заказах и сроках — в [FAQ](/ru/faq).",
        ],
      },
      mn: {
        title: "Бага температурын радиатор ба дулааны насос: нийцлийн гарын авлага",
        excerpt:
          "Радиатор дулааны насостай ажиллах уу? Тийм — бага температурт тохируулан сонговол. ΔT30 гэж юу болох, COP яагаад өгөх усны температураас хамаардаг, нийцтэй радиаторыг хэрхэн сонгохыг тайлбарлав.",
        body: [
          "Агаар-ус дулааны насос нь Испани болон Европын ихэнх оронд зуухыг солих үндсэн шийдэл болсон — эрчим хүчний шинэчлэлийн хөтөлбөр, халаалтын цахилгаанжуулалт үүнийг түргэсгэж байна. Үргэлж нэг асуулт гарна: дулааны насостай радиатораа үлдээж болох уу, эсвэл шалны халаалт заавал тавих уу? Богино хариулт: бага температурт тохируулан сонгосон бол радиатор дулааны насостай төгс ажиллана. Дэлгэрэнгүйг доороос үзнэ үү.",
          "## Дулааны насос яагаад дүрмийг өөрчилдөг вэ",
          "Хийн зуух 70–80 °C-ийн усаар чөлөөтэй ажилладаг. Агаар-ус дулааны насос харин 35–45 °C-ийн өгөх температурт хамгийн өндөр үр ашигтай: өгөх температур нэг градусаар буурах тутамд COP ойролцоогоор 2–3 %-иар сайжирна. Насосыг 60 °C хүртэл ажиллуулж болох ч хамгийн хүйтэн өдрүүдэд цахилгааны зарцуулалт өснө. Тиймээс халаалтын төхөөрөмж — радиаторууд — хамаагүй сэрүүн усаар шаардлагатай дулааныг өгөх чадвартай байх ёстой.",
          "## ΔT30 гэж юу вэ, яагаад чухал вэ",
          "Радиаторын хүчин чадлыг EN 442 стандартаар ΔT50 нөхцөлд туршдаг: усны дундаж температур өрөөний агаараас 50 °C өндөр (75/65/20 горим). Дулааны насостай үед ус 20 °C-ийн өрөөнд дунджаар 40–45 °C-тэй эргэлддэг — энэ нь ойролцоогоор 25–30 K-ийн ΔT. Дулаан өгөлт шууд пропорциональ биш, зэрэгт хамаарлаар буурдаг: ган радиаторын n ≈ 1,3 үзүүлэлттэйгээр ΔT30 үед радиатор ΔT50-ийн нэрлэсэн хүчин чадлынхаа ойролцоогоор 51 %-ийг өгнө. 2000 Вт нэрлэсэн хүчин чадалтай радиатор дулааны насостай үед ойролцоогоор 1030 Вт өгнө.",
          "## Ган радиатор дулааны насостай ажиллах уу?",
          "Тийм, бас давуу талтай: гангаар том гадаргуутай төхөөрөмж хийж болдог — 22, 33 төрлийн хавтан, олон баганат хоолойт, 1800–2000 мм хүртэлх босоо загварууд — эдгээр нь бага температурын зөрүүг илүү их дулаан өгөх талбайгаар нөхдөг. Угсрагчдын практик дүрэм: шугам хоолойг өөрчлөхгүйгээр зуухнаас дулааны насост шилжихэд суурилуулсан радиаторын талбай сонгодог ΔT50 тооцооллоос ойролцоогоор хоёр дахин их байх ёстой. Шинэчлэлийн үед ихэвчлэн хамгийн «яг таг» сонгогдсон радиаторуудыг ижил хэмжээтэй боловч илүү гүн загвараар (11-ийн оронд 22 төрөл) солиход хангалттай.",
          "## Алхам алхмаар хэмжээ тогтоох",
          "Эхлээд өрөө бүрийн дулааны алдагдлыг тооцоолно. Дараа нь дулааны насосны зураг төслийн өгөх температурыг сонгоно: бага байх тусам COP сайн. Эцэст нь радиатор бүрийг ΔT50 биш, ΔT30 үеийн хүчин чадлаар нь сонгоно. Энэ алхмыг хялбарчлахын тулд [JIUDING-ийн бүтээгдэхүүний хуудсууд](/mn/products) ΔT50 ба ΔT30 хоёр горимын дулаан өгөлтийг n = 1,3 үзүүлэлтээр тооцоолон харуулдаг.",
          "## Шинэчлэлд: радиатор уу, шалны халаалт уу",
          "Шалны халаалт шинэ барилгад маш сайн боловч шинэчлэлд шал хуулах, хэдэн см-ийн цутгалт, хэдэн долоо хоногийн ажил шаардана. Радиатор солих нь өрөө тутамд хэдхэн цагийн ажил бөгөөд таазны өндөр, шалны бүрээст нөлөөлөхгүй. Бага температурт зөв сонгосон радиатортой бол дулааны насос ихэнх сууцанд харьцуулахуйц улирлын үр ашигт хүрдэг бөгөөд системд нэг давуу тал үлдэнэ: бага инерци, тохиргооны өөрчлөлтөд хурдан хариу үйлдэл.",
          "## Үйлдвэрлэгчээс юу шаардах вэ",
          "Тодорхойлолт хийхээсээ өмнө гурван зүйл хүсээрэй: загварын Km, n утга бүхий EN 442-ын хүчин чадлын мэдэгдэл, нэрлэсэн утгын хажуугаар ΔT30 үеийн хүчин чадал, мөн ажлын даралт (JIUDING-ийн ган радиаторууд 1,0 МПа / 10 бар-т ажиллаж, төхөөрөмж бүр үйлдвэрт ажлын даралтаас 1,5 дахин өндөр даралтаар туршигддаг). Туршилтын тайлан, CE гэрчилгээг [баримт бичгийн төвөөс](/mn/documents), захиалга, хугацааны түгээмэл асуултын хариуг [FAQ-аас](/mn/faq) үзнэ үү.",
        ],
      },
    },
  },
  {
    slug: "calculate-radiator-output-per-room",
    date: "2026-06-11",
    content: {
      es: {
        title: "Cómo calcular la potencia de radiador necesaria por habitación",
        excerpt:
          "Guía práctica para dimensionar radiadores en España: vatios por metro cuadrado según la zona climática del CTE, correcciones por orientación y aislamiento, y un ejemplo completo paso a paso.",
        body: [
          "Dimensionar mal un radiador sale caro en ambos sentidos: si falta potencia, la habitación no alcanza la temperatura de confort en los días fríos; si sobra mucho, se paga de más en emisores y la regulación pierde finura. La buena noticia es que para una vivienda estándar el cálculo se hace en minutos con un método de vatios por metro cuadrado corregido. Vamos paso a paso.",
          "## El punto de partida: vatios por metro cuadrado",
          "Para techos de unos 2,5 m y un aislamiento razonable, la demanda de calefacción en España se mueve entre 60 y 110 W/m² según la severidad climática de invierno que define el Código Técnico de la Edificación (CTE). Orientación por zonas: zona A y B (litoral sur y mediterráneo: Cádiz, Málaga, Sevilla, Valencia) — 60–70 W/m²; zona C (Barcelona, Bilbao, A Coruña) — 70–85 W/m²; zona D (Madrid, Zaragoza, Valladolid) — 85–100 W/m²; zona E (Burgos, Soria, Ávila y zonas de montaña) — 100–110 W/m² o más.",
          "## Correcciones que sí importan",
          "El valor base se ajusta con coeficientes sencillos. Habitación orientada al norte o muy expuesta al viento: +10–15 %. Aislamiento pobre (vivienda anterior a 1980 sin rehabilitar): +15–20 %. Superficie acristalada grande o carpinterías antiguas: +10 %. Última planta bajo cubierta sin aislar o suelo sobre local no calefactado: +10–15 %. Techos altos: a partir de 2,7 m conviene calcular por volumen, con 35–40 W/m³ como referencia en zona D. Los coeficientes se multiplican, no se suman: dos factores de 1,15 dan 1,32, no 1,30.",
          "## Ejemplo completo",
          "Dormitorio de 12 m² en Madrid (zona D), orientado al norte, edificio de 2005 con aislamiento correcto. Base: 12 × 90 = 1080 W. Corrección por orientación norte: 1080 × 1,12 ≈ 1210 W. Esa es la potencia que el radiador debe entregar en condiciones de diseño. Con caldera a régimen clásico, basta elegir un modelo con potencia nominal ΔT50 igual o superior a 1210 W. Con aerotermia, el mismo cálculo se compara contra la potencia a ΔT30 del radiador — aproximadamente la mitad de la nominal —, por lo que haría falta un emisor de unos 2400 W nominales o dos de 1200 W.",
          "## De vatios al radiador concreto",
          "Con la cifra en la mano, la elección es un filtro por dimensiones: la altura disponible bajo la ventana o en la pared decide entre modelos de 300, 500, 600 mm o verticales de 1500–1800 mm. En paneles de acero, un tipo 22 de 600 mm de altura entrega del orden del doble de potencia por metro de longitud que un tipo 11, ocupando el mismo hueco en alzado. En radiadores tubulares y seccionales, la potencia se ajusta por número de elementos: divida la demanda entre la emisión por elemento del modelo elegido y redondee hacia arriba. Todas las series JIUDING publican estos datos en sus [páginas de producto](/es/products), con valores a ΔT50 y ΔT30.",
          "## Errores comunes que conviene evitar",
          "Primero: aplicar un único valor de W/m² a toda España — entre Málaga y Burgos la demanda casi se duplica. Segundo: ignorar el régimen de temperaturas del sistema y comparar la demanda con la potencia nominal cuando la instalación trabajará a baja temperatura. Tercero: dimensionar la vivienda entera de una vez en lugar de habitación por habitación — los pasillos y los dormitorios no necesitan lo mismo. Cuarto: olvidar que la potencia nominal se declara según EN 442; si un catálogo no indica el salto térmico de referencia, esa cifra no es comparable.",
          "## Hágalo en un minuto",
          "Hemos resumido este método en nuestra [calculadora de radiadores](/es/calculator): introduzca superficie, altura de techo y nivel de aislamiento, y obtendrá la potencia recomendada con la conversión a baja temperatura incluida. Para proyectos completos —promociones, hoteles, rehabilitaciones integrales— nuestro equipo técnico prepara el dimensionado estancia por estancia sobre plano; las preguntas frecuentes sobre plazos y pedidos están en el [FAQ](/es/faq).",
        ],
      },
      en: {
        title: "How to Calculate the Radiator Output a Room Needs",
        excerpt:
          "A practical sizing guide for Spain: watts per square metre by CTE climate zone, corrections for orientation and insulation, and a complete worked example.",
        body: [
          "Getting radiator sizing wrong is costly in both directions: too little output and the room never reaches comfort temperature on cold days; far too much and you overpay for emitters while control gets coarser. The good news: for a standard dwelling the calculation takes minutes using a corrected watts-per-square-metre method. Step by step below.",
          "## The starting point: watts per square metre",
          "For ceilings around 2.5 m and reasonable insulation, heating demand in Spain ranges from 60 to 110 W/m² depending on the winter climate severity defined by the Spanish Technical Building Code (CTE). By zone: zones A and B (southern and Mediterranean coast: Cádiz, Málaga, Seville, Valencia) — 60–70 W/m²; zone C (Barcelona, Bilbao, A Coruña) — 70–85 W/m²; zone D (Madrid, Zaragoza, Valladolid) — 85–100 W/m²; zone E (Burgos, Soria, Ávila and mountain areas) — 100–110 W/m² or more.",
          "## Corrections that actually matter",
          "The base value is adjusted with simple coefficients. North-facing or wind-exposed room: +10–15%. Poor insulation (pre-1980 building without renovation): +15–20%. Large glazing or old window frames: +10%. Top floor under an uninsulated roof, or floor above an unheated space: +10–15%. High ceilings: above 2.7 m switch to a volume basis, around 35–40 W/m³ as a zone D reference. Coefficients multiply rather than add: two factors of 1.15 give 1.32, not 1.30.",
          "## A complete worked example",
          "A 12 m² bedroom in Madrid (zone D), north-facing, 2005 building with decent insulation. Base: 12 × 90 = 1080 W. North orientation correction: 1080 × 1.12 ≈ 1210 W. That is the output the radiator must deliver at design conditions. With a boiler at the classic regime, choose a model whose ΔT50 nominal output is at least 1210 W. With a heat pump, compare the same demand against the radiator's ΔT30 output — roughly half the nominal — so you would need an emitter of about 2400 W nominal, or two of 1200 W.",
          "## From watts to a specific radiator",
          "With the figure in hand, selection becomes a filter by dimensions: the height available under the window or on the wall decides between 300, 500, 600 mm models or 1500–1800 mm verticals. Among steel panels, a type 22 at 600 mm height delivers roughly twice the output per metre of length compared with a type 11 in the same elevation footprint. For tubular and sectional radiators, output is tuned by section count: divide the demand by the per-section output of the chosen model and round up. All JIUDING series publish these figures on their [product pages](/en/products), with both ΔT50 and ΔT30 values.",
          "## Common mistakes to avoid",
          "First: applying a single W/m² value to the whole of Spain — between Málaga and Burgos demand nearly doubles. Second: ignoring the system's temperature regime and comparing demand against nominal output when the installation will run at low temperature. Third: sizing the whole dwelling at once instead of room by room — hallways and bedrooms do not need the same. Fourth: forgetting that nominal output is declared under EN 442; if a catalogue does not state the reference temperature difference, the figure is not comparable.",
          "## Do it in a minute",
          "We have condensed this method into our [radiator calculator](/en/calculator): enter floor area, ceiling height and insulation level to get the recommended output, low-temperature conversion included. For complete projects — developments, hotels, full renovations — our technical team prepares room-by-room sizing from drawings; frequent questions about lead times and orders are answered in the [FAQ](/en/faq).",
        ],
      },
      ru: {
        title: "Как рассчитать мощность радиатора для комнаты",
        excerpt:
          "Практический гид по подбору мощности для Испании: ватты на квадратный метр по климатическим зонам CTE, поправки на ориентацию и утепление и полный пример расчёта.",
        body: [
          "Ошибка в подборе мощности радиатора обходится дорого в обе стороны: при нехватке комната не прогревается в холодные дни, при большом избытке вы переплачиваете за приборы, а регулирование становится грубее. Хорошая новость: для типового жилья расчёт занимает минуты по методу «ватты на квадратный метр» с поправками. Разберём по шагам на примере испанского рынка.",
          "## Отправная точка: ватты на квадратный метр",
          "Для потолков около 2,5 м и разумного утепления потребность в отоплении в Испании составляет от 60 до 110 Вт/м² в зависимости от зимней климатической зоны по строительному кодексу CTE. Ориентиры: зоны A и B (южное и средиземноморское побережье: Кадис, Малага, Севилья, Валенсия) — 60–70 Вт/м²; зона C (Барселона, Бильбао, А-Корунья) — 70–85 Вт/м²; зона D (Мадрид, Сарагоса, Вальядолид) — 85–100 Вт/м²; зона E (Бургос, Сория, Авила и горные районы) — 100–110 Вт/м² и выше. Для сравнения: в средней полосе России принят ориентир около 100 Вт/м², в Монголии — 150 Вт/м².",
          "## Поправки, которые действительно важны",
          "Базовое значение корректируется простыми коэффициентами. Комната на север или продуваемая ветром: +10–15 %. Слабое утепление (дом до 1980 года без реконструкции): +15–20 %. Большое остекление или старые рамы: +10 %. Последний этаж под неутеплённой кровлей или пол над неотапливаемым помещением: +10–15 %. Высокие потолки: от 2,7 м переходите на расчёт по объёму, ориентир для зоны D — 35–40 Вт/м³. Коэффициенты перемножаются, а не складываются: два фактора по 1,15 дают 1,32, а не 1,30.",
          "## Полный пример расчёта",
          "Спальня 12 м² в Мадриде (зона D), окна на север, дом 2005 года с нормальным утеплением. База: 12 × 90 = 1080 Вт. Поправка на север: 1080 × 1,12 ≈ 1210 Вт. Столько прибор должен отдавать в расчётных условиях. С котлом в классическом режиме достаточно выбрать модель с номинальной мощностью при ΔT50 не ниже 1210 Вт. С тепловым насосом ту же потребность сравнивают с мощностью прибора при ΔT30 — примерно половиной номинала, — поэтому понадобится прибор около 2400 Вт номинала или два по 1200 Вт.",
          "## От ваттов к конкретному прибору",
          "С цифрой на руках выбор сводится к фильтру по габаритам: доступная высота под окном или на стене определяет выбор между моделями 300, 500, 600 мм или вертикальными 1500–1800 мм. Среди стальных панельных приборов тип 22 высотой 600 мм отдаёт примерно вдвое больше на метр длины, чем тип 11 в том же габарите по фасаду. У трубчатых и секционных радиаторов мощность набирается количеством секций: разделите потребность на теплоотдачу секции выбранной модели и округлите вверх. Все серии JIUDING публикуют эти данные на [страницах продукции](/ru/products) — со значениями при ΔT50 и ΔT30.",
          "## Частые ошибки",
          "Первая: применять одно значение Вт/м² ко всей стране — между Малагой и Бургосом потребность различается почти вдвое. Вторая: игнорировать температурный режим системы и сравнивать потребность с номиналом, когда система будет работать на низкой температуре. Третья: считать сразу на всё жильё вместо покомнатного расчёта — коридору и спальне нужно разное. Четвёртая: забывать, что номинальная мощность декларируется по EN 442; если каталог не указывает расчётный температурный напор, цифра несравнима.",
          "## Расчёт за минуту",
          "Мы свели этот метод в [калькулятор радиаторов](/ru/calculator): укажите площадь, высоту потолка и уровень утепления — и получите рекомендуемую мощность с пересчётом на низкотемпературный режим. Для комплексных проектов — жилых комплексов, гостиниц, реконструкций — наша техническая команда выполняет покомнатный подбор по чертежам; ответы на частые вопросы о сроках и заказах — в [FAQ](/ru/faq).",
        ],
      },
      mn: {
        title: "Өрөөнд хэрэгтэй радиаторын хүчин чадлыг хэрхэн тооцоолох вэ",
        excerpt:
          "Хүчин чадал тогтоох практик гарын авлага: уур амьсгалын бүсээр ялгаатай Вт/м² хэмжигдэхүүн, чиглэл ба дулаалгын залруулга, бүрэн жишээ тооцоо.",
        body: [
          "Радиаторын хүчин чадлыг буруу тогтоох нь хоёр талдаа үнэтэй: дутвал хүйтэн өдрүүдэд өрөө тав тухтай температурт хүрэхгүй; хэт ихдвэл төхөөрөмжид илүү зардал гарч, зохицуулга бүдүүн болно. Сайн мэдээ: энгийн сууцанд тооцоо нь залруулгатай «Вт/м²» аргаар хэдхэн минут болдог. Испанийн зах зээлийн жишээгээр алхам алхмаар авч үзье.",
          "## Эхлэх цэг: ам метр тутамд ноогдох ватт",
          "2,5 м орчим таазтай, боломжийн дулаалгатай үед Испанид халаалтын хэрэгцээ барилгын дүрэм (CTE)-ийн өвлийн уур амьсгалын бүсээс хамааран 60–110 Вт/м² байдаг: A, B бүс (өмнөд эрэг: Кадис, Малага, Севилья, Валенси) — 60–70 Вт/м²; C бүс (Барселона, Бильбао) — 70–85 Вт/м²; D бүс (Мадрид, Сарагоса) — 85–100 Вт/м²; E бүс (Бургос, Сориа, уулархаг нутаг) — 100–110 Вт/м² ба түүнээс дээш. Харьцуулбал: Оросын дунд бүсэд ойролцоогоор 100 Вт/м², Монголд эрс тэс уур амьсгалын улмаас 150 Вт/м² хэмжигдэхүүнийг баримталдаг.",
          "## Үнэхээр чухал залруулгууд",
          "Суурь утгыг энгийн коэффициентоор залруулна. Хойд зүг рүү харсан буюу салхинд ил өрөө: +10–15 %. Муу дулаалга (1980 оноос өмнөх, шинэчлээгүй барилга): +15–20 %. Том шиллэгээ буюу хуучин цонх: +10 %. Дулаалгагүй дээвэр доорх дээд давхар, халаалтгүй өрөөн дээрх шал: +10–15 %. Өндөр тааз: 2,7 м-ээс дээш бол эзлэхүүнээр тооцоолж, D бүсэд 35–40 Вт/м³ баримжаална. Коэффициентуудыг нэмэхгүй, үржүүлнэ: 1,15-ын хоёр хүчин зүйл 1,30 биш 1,32 болно.",
          "## Бүрэн жишээ тооцоо",
          "Мадрид дахь (D бүс) хойд зүг рүү харсан, 2005 онд баригдсан, хэвийн дулаалгатай 12 м² унтлагын өрөө. Суурь: 12 × 90 = 1080 Вт. Хойд чиглэлийн залруулга: 1080 × 1,12 ≈ 1210 Вт. Энэ бол зураг төслийн нөхцөлд радиаторын өгөх ёстой хүчин чадал. Сонгодог горимтой зуухтай бол ΔT50 үеийн нэрлэсэн хүчин чадал нь 1210 Вт-аас багагүй загвар сонгоход хангалттай. Дулааны насостай бол мөн хэрэгцээг радиаторын ΔT30 үеийн хүчин чадалтай — нэрлэсэн утгын тэн хагас орчимтой — харьцуулна: ойролцоогоор 2400 Вт нэрлэсэн хүчин чадалтай нэг, эсвэл 1200 Вт-ын хоёр төхөөрөмж хэрэгтэй.",
          "## Ваттаас тодорхой радиатор руу",
          "Тоо гарсны дараа сонголт нь хэмжээний шүүлтүүр болно: цонхны доорх болон хананы боломжит өндөр нь 300, 500, 600 мм-ийн загвар эсвэл 1500–1800 мм-ийн босоо загварын аль нэгийг шийднэ. Ган хавтан радиаторын дотроос 600 мм өндөртэй 22 төрөл нь ижил хэмжээний 11 төрлөөс метр урт тутамд ойролцоогоор хоёр дахин их дулаан өгдөг. Хоолойт болон секцтэй радиаторт хүчин чадлыг секцийн тоогоор тохируулна: хэрэгцээг сонгосон загварын нэг секцийн дулаан өгөлтөд хувааж, дээш нь бүхэлчилнэ. JIUDING-ийн бүх цуврал эдгээр үзүүлэлтийг ΔT50, ΔT30 утгын хамт [бүтээгдэхүүний хуудсандаа](/mn/products) нийтэлдэг.",
          "## Зайлсхийвэл зохих түгээмэл алдаа",
          "Нэгдүгээрт: улс даяар нэг Вт/м² утга хэрэглэх — Малага, Бургос хоёрын хооронд хэрэгцээ бараг хоёр дахин зөрдөг. Хоёрдугаарт: системийн температурын горимыг үл тоон, бага температурт ажиллах системд хэрэгцээг нэрлэсэн хүчин чадалтай харьцуулах. Гуравдугаарт: өрөө өрөөгөөр биш, бүх сууцыг нэг дор тооцох — коридор, унтлагын өрөө хоёрт өөр өөр хэрэгцээ бий. Дөрөвдүгээрт: нэрлэсэн хүчин чадал EN 442-аар зарлагддагийг мартах; каталогт жишиг температурын зөрүүг заагаагүй бол тэр тоо харьцуулах боломжгүй.",
          "## Нэг минутад тооцоолох",
          "Бид энэ аргыг [радиаторын тооцоолуурт](/mn/calculator) шингээсэн: талбай, таазны өндөр, дулаалгын түвшнээ оруулахад бага температурын хөрвүүлэлтийг оруулсан зөвлөмж хүчин чадал гарна. Бүрэн хэмжээний төсөлд — хороолол, зочид буудал, их засвар — манай техникийн баг зургаас өрөө тус бүрийн сонголтыг бэлтгэнэ; хугацаа, захиалгын түгээмэл асуултын хариу [FAQ-д](/mn/faq) бий.",
        ],
      },
    },
  },
  {
    slug: "understanding-en442-dt50-dt30",
    date: "2026-06-11",
    content: {
      en: {
        title: "Understanding EN 442: What ΔT50 and ΔT30 Outputs Really Mean for Buyers",
        excerpt:
          "EN 442 is the standard behind every radiator heat output figure sold in Europe. A procurement-focused guide to ΔT50, ΔT30, the characteristic exponent n — and how to read a test report before you sign a supply contract.",
        body: [
          "Every radiator legally sold in the European Union carries a declared heat output measured under EN 442. Yet in B2B procurement we regularly see tenders comparing figures that were never comparable: outputs at different temperature regimes, ratings without a stated ΔT, or catalogue numbers with no test report behind them. This guide explains what the standard actually measures and what a buyer should check before signing a supply contract.",
          "## What EN 442 covers",
          "EN 442 is the harmonised European standard for radiators and convectors operating below 120 °C. Part 1 defines technical specifications and requirements — materials, pressure tightness, surface treatment, marking. Part 2 defines the test method for thermal output: the radiator is measured in a closed, water-cooled booth at a notified laboratory, at a standard regime of 75 °C flow, 65 °C return and 20 °C room air. Because the standard is harmonised under the Construction Products Regulation, a radiator placed on the EU market must carry CE marking with a declaration of performance based on these tests.",
          "## ΔT50 in plain terms",
          "The headline figure from an EN 442 test is the output at ΔT50. The ΔT — also called excess temperature — is the difference between the mean water temperature and the room air: (75 + 65) / 2 − 20 = 50 K. So when a datasheet says \"1 460 W\", it means 1 460 W when the water inside the radiator averages 70 °C in a 20 °C room. If your system runs cooler — and most modern systems do — the real output will be lower. This single fact explains most \"underperforming radiator\" complaints we encounter in projects.",
          "## The characteristic equation and the exponent n",
          "An EN 442 test does not produce one number but a curve, described by the characteristic equation Φ = Km × ΔT^n. Km is a constant for the model; the exponent n describes how steeply output falls as the water cools. For steel panel and tubular radiators n is typically close to 1.3. The test report states both values, which lets an engineer compute output at any regime — not just the two printed in a catalogue. When comparing suppliers, ask for Km and n: two radiators with identical ΔT50 ratings but different exponents will behave differently in a low-temperature system.",
          "## Why ΔT30 has become the second headline figure",
          "With heat pumps and condensing boilers, design water temperatures have dropped to 40–55 °C, which corresponds to ΔT of roughly 25–35 K. At ΔT30 a steel radiator delivers about 51% of its ΔT50 rating (0.6^1.3 ≈ 0.515). Markets that are electrifying heating — Spain, France, the UK — increasingly expect both figures side by side. JIUDING [product pages](/en/products) show ΔT50 and ΔT30 outputs for every series, so specifiers do not need to redo the conversion.",
          "## How to read a test report: a buyer's checklist",
          "When qualifying a radiator supplier, request the EN 442 test reports and check five things. One: the issuing laboratory — it should be a recognised notified body (JIUDING's thermal performance is validated by BSRIA in the UK, which also covers UKCA compliance). Two: that the tested models and sizes actually cover the range you are buying — interpolation between tested sizes is legitimate, extrapolation beyond them is not. Three: the presence of Km and n values, not just a single wattage. Four: consistency between the report, the declaration of performance and the catalogue. Five: pressure data — EN 442 also requires tightness; JIUDING additionally pressure-tests every production unit at 1.5× working pressure as part of ISO 9001 process control.",
          "## Red flags in supplier documentation",
          "Outputs quoted without any ΔT reference. Catalogue figures that exceed the test report for the same size. \"Equivalent to EN 442\" wording without an actual report. A single test certificate recycled across visibly different product generations. None of these automatically mean bad product — but each is a reason to ask further questions before committing volume.",
          "## Where to verify our documentation",
          "JIUDING manufactures steel panel, column, designer and towel radiators with an annual capacity of 4 million sections across 600+ specifications. Our EN 442 test reports, CE declarations and UKCA documentation are available in the [documentation centre](/en/documents), with certificates summarised on the [credentials page](/en/credentials). For project-specific data — custom heights, colours or connection types — our engineering team provides per-model output tables on request.",
        ],
      },
      ru: {
        title: "Стандарт EN 442: что на самом деле означают мощности при ΔT50 и ΔT30",
        excerpt:
          "EN 442 — стандарт, стоящий за каждой цифрой теплоотдачи радиатора в Европе. Гид для закупщика: ΔT50, ΔT30, характеристический показатель n и как читать протокол испытаний перед контрактом.",
        body: [
          "Каждый радиатор, легально продаваемый в Евросоюзе, имеет декларированную теплоотдачу, измеренную по EN 442. Тем не менее в B2B-закупках мы регулярно видим тендеры, где сравнивают несравнимое: мощности при разных температурных режимах, цифры без указания ΔT или каталожные значения без протокола испытаний. Разберём, что именно измеряет стандарт и что проверить закупщику перед подписанием контракта на поставку.",
          "## Что охватывает EN 442",
          "EN 442 — гармонизированный европейский стандарт для радиаторов и конвекторов с температурой теплоносителя до 120 °C. Часть 1 задаёт технические требования: материалы, герметичность под давлением, покрытие, маркировку. Часть 2 описывает метод испытания теплоотдачи: прибор измеряют в закрытой охлаждаемой камере аккредитованной лаборатории при стандартном режиме 75/65/20 — подача 75 °C, обратка 65 °C, воздух 20 °C. Поскольку стандарт гармонизирован под Регламент строительной продукции, радиатор на рынке ЕС должен нести маркировку CE с декларацией характеристик на основе этих испытаний.",
          "## ΔT50 простыми словами",
          "Главная цифра испытания по EN 442 — мощность при ΔT50. ΔT, или температурный напор, — это разница между средней температурой воды и воздухом в помещении: (75 + 65) / 2 − 20 = 50 K. Когда в паспорте написано «1460 Вт», это означает 1460 Вт при средней температуре воды 70 °C в комнате с температурой 20 °C. Если система работает на более прохладной воде — а большинство современных систем именно такие, — реальная отдача будет ниже. Этот факт объясняет большинство жалоб на «недогревающие радиаторы» в проектах.",
          "## Характеристическое уравнение и показатель n",
          "Испытание по EN 442 даёт не одну цифру, а кривую, описываемую уравнением Φ = Km × ΔT^n. Km — константа модели; показатель n описывает, насколько круто падает отдача при остывании воды. Для стальных панельных и трубчатых радиаторов n обычно близок к 1,3. В протоколе указаны оба значения, что позволяет инженеру вычислить мощность при любом режиме, а не только при двух напечатанных в каталоге. Сравнивая поставщиков, запрашивайте Km и n: два прибора с одинаковой мощностью при ΔT50, но разными показателями поведут себя в низкотемпературной системе по-разному.",
          "## Почему ΔT30 стала второй главной цифрой",
          "С тепловыми насосами и конденсационными котлами расчётные температуры воды снизились до 40–55 °C, что соответствует ΔT примерно 25–35 K. При ΔT30 стальной радиатор отдаёт около 51 % мощности при ΔT50 (0,6^1,3 ≈ 0,515). Рынки, электрифицирующие отопление, — Испания, Франция, Великобритания — всё чаще требуют обе цифры рядом. На [страницах продукции JIUDING](/ru/products) теплоотдача указана при ΔT50 и ΔT30 для каждой серии.",
          "## Как читать протокол испытаний: чек-лист закупщика",
          "Квалифицируя поставщика радиаторов, запросите протоколы EN 442 и проверьте пять пунктов. Первое: лаборатория — это должен быть признанный нотифицированный орган (тепловые характеристики JIUDING подтверждены BSRIA в Великобритании, что также закрывает соответствие UKCA). Второе: испытанные модели и размеры действительно покрывают закупаемый диапазон — интерполяция между испытанными размерами допустима, экстраполяция за их пределы — нет. Третье: наличие значений Km и n, а не одной цифры в ваттах. Четвёртое: согласованность протокола, декларации характеристик и каталога. Пятое: данные по давлению — EN 442 требует герметичности; JIUDING дополнительно испытывает каждый серийный прибор давлением в 1,5 раза выше рабочего в рамках контроля процессов по ISO 9001.",
          "## Тревожные сигналы в документации поставщика",
          "Мощности без указания ΔT. Каталожные цифры выше протокольных для того же размера. Формулировка «эквивалентно EN 442» без реального протокола. Один сертификат, кочующий между явно разными поколениями продукции. Ничто из этого не означает автоматически плохой продукт — но каждый пункт является поводом задать дополнительные вопросы до размещения объёма.",
          "## Где проверить нашу документацию",
          "JIUDING производит стальные панельные, трубчатые, дизайнерские радиаторы и полотенцесушители с мощностью 4 млн секций в год и более чем 600 типоразмерами. Протоколы испытаний EN 442, декларации CE и документация UKCA доступны в [центре документации](/ru/documents), сводка сертификатов — на странице [«Сертификаты»](/ru/credentials). Для проектных данных — нестандартные высоты, цвета, типы подключения — инженерная команда предоставляет таблицы мощности по запросу.",
        ],
      },
      mn: {
        title: "EN 442 стандартыг ойлгох нь: ΔT50 ба ΔT30 хүчин чадал худалдан авагчид юу өгүүлдэг вэ",
        excerpt:
          "EN 442 бол Европт зарагдаж буй радиатор бүрийн дулаан өгөлтийн цифрийн ард байдаг стандарт. ΔT50, ΔT30, n үзүүлэлт болон нийлүүлэлтийн гэрээнээс өмнө туршилтын тайланг хэрхэн уншихыг тайлбарласан худалдан авагчийн гарын авлага.",
        body: [
          "Европын Холбоонд хууль ёсоор зарагдаж буй радиатор бүр EN 442-аар хэмжсэн зарласан дулаан өгөлттэй байдаг. Гэвч B2B худалдан авалтад харьцуулах боломжгүй тоонуудыг харьцуулсан тендер байнга таардаг: өөр өөр температурын горимын хүчин чадал, ΔT заагаагүй үзүүлэлт, туршилтын тайлангүй каталогийн тоо. Энэ гарын авлагад стандарт яг юу хэмждэг, гэрээ байгуулахаас өмнө худалдан авагч юуг шалгах ёстойг тайлбарлая.",
          "## EN 442 юуг хамардаг вэ",
          "EN 442 бол 120 °C хүртэлх температурт ажилладаг радиатор, конвекторын Европын нэгдсэн стандарт. 1-р хэсэг нь техникийн шаардлагыг тогтооно: материал, даралтын битүүмжлэл, гадаргуугийн боловсруулалт, тэмдэглэгээ. 2-р хэсэг нь дулааны хүчин чадлын туршилтын аргыг тодорхойлно: радиаторыг итгэмжлэгдсэн лабораторийн битүү, усан хөргөлттэй камерт 75/65/20 стандарт горимд хэмждэг — өгөх 75 °C, буцах 65 °C, өрөөний агаар 20 °C. Стандарт нь Барилгын бүтээгдэхүүний журамд нийцсэн тул ЕХ-ны зах зээл дээрх радиатор эдгээр туршилтад үндэслэсэн гүйцэтгэлийн мэдэгдэл бүхий CE тэмдэгтэй байх ёстой.",
          "## ΔT50 гэдгийг энгийнээр",
          "EN 442 туршилтын гол тоо бол ΔT50 үеийн хүчин чадал. ΔT буюу температурын напор нь усны дундаж температур ба өрөөний агаарын зөрүү: (75 + 65) / 2 − 20 = 50 K. Паспортод «1460 Вт» гэж бичсэн бол энэ нь 20 °C-ийн өрөөнд радиатор доторх ус дунджаар 70 °C байх үеийн 1460 Вт гэсэн үг. Таны систем илүү сэрүүн усаар ажилладаг бол — орчин үеийн ихэнх систем тийм — бодит өгөлт бага байна. Энэ нэг баримт төслүүдэд гардаг «дулаан хүрэхгүй радиатор» гомдлын ихэнхийг тайлбарладаг.",
          "## Шинж чанарын тэгшитгэл ба n үзүүлэлт",
          "EN 442 туршилт нэг тоо биш, Φ = Km × ΔT^n тэгшитгэлээр илэрхийлэгдэх муруй гаргадаг. Km нь загварын тогтмол; n үзүүлэлт нь ус хөрөхөд өгөлт хэр огцом буурахыг илэрхийлнэ. Ган хавтан болон хоолойт радиаторт n ихэвчлэн 1,3-д ойр. Тайланд хоёр утгыг хоёуланг нь заадаг тул инженер каталогт хэвлэгдсэн хоёр горимоос гадна дурын горимын хүчин чадлыг тооцоолж чадна. Нийлүүлэгчдийг харьцуулахдаа Km ба n-ийг асуугаарай: ΔT50 үеийн хүчин чадал нь ижил ч үзүүлэлт нь өөр хоёр радиатор бага температурын системд өөр өөрөөр ажиллана.",
          "## ΔT30 яагаад хоёр дахь гол тоо болсон бэ",
          "Дулааны насос, конденсацийн зуухны эринд зураг төслийн усны температур 40–55 °C болж буурсан нь ойролцоогоор 25–35 K-ийн ΔT-д тохирно. ΔT30 үед ган радиатор ΔT50 үзүүлэлтийнхээ ойролцоогоор 51 %-ийг өгдөг (0,6^1,3 ≈ 0,515). Халаалтаа цахилгаанжуулж буй зах зээлүүд — Испани, Франц, Их Британи — хоёр тоог зэрэгцүүлэн шаардах нь нэмэгдэж байна. JIUDING-ийн [бүтээгдэхүүний хуудсууд](/mn/products) цуврал бүрийн ΔT50 ба ΔT30 өгөлтийг харуулдаг.",
          "## Туршилтын тайланг хэрхэн унших вэ: худалдан авагчийн шалгах хуудас",
          "Радиаторын нийлүүлэгчийг үнэлэхдээ EN 442 тайланг хүсч, таван зүйлийг шалгаарай. Нэг: тайлан гаргасан лаборатори — хүлээн зөвшөөрөгдсөн итгэмжлэгдсэн байгууллага байх ёстой (JIUDING-ийн дулааны үзүүлэлтийг Их Британийн BSRIA баталгаажуулсан бөгөөд энэ нь UKCA-ийн нийцлийг мөн хамардаг). Хоёр: туршсан загвар, хэмжээ нь таны худалдан авах хүрээг бодитоор хамарсан эсэх — туршсан хэмжээний хооронд интерполяци хийх нь зөв, хүрээнээс гадуур экстраполяци хийх нь буруу. Гурав: нэг ваттын тоо биш, Km ба n утга байгаа эсэх. Дөрөв: тайлан, гүйцэтгэлийн мэдэгдэл, каталогийн нийцэл. Тав: даралтын өгөгдөл — EN 442 битүүмжлэл шаарддаг; JIUDING нэмээд ISO 9001-ийн хяналтын хүрээнд үйлдвэрлэсэн төхөөрөмж бүрийг ажлын даралтаас 1,5 дахин өндөр даралтаар турших юм.",
          "## Нийлүүлэгчийн баримт бичгийн анхааруулах дохио",
          "ΔT заалтгүй хүчин чадал. Ижил хэмжээний хувьд тайлангаас өндөр каталогийн тоо. Бодит тайлангүй «EN 442-тай дүйцэхүйц» гэх томъёолол. Илт өөр үеийн бүтээгдэхүүнүүдэд дахин ашиглагдсан ганц гэрчилгээ. Эдгээр нь муу бүтээгдэхүүн гэсэн үг биш ч тус бүр нь их хэмжээний захиалга өгөхөөс өмнө нэмэлт асуулт тавих үндэслэл юм.",
          "## Манай баримт бичгийг хаанаас шалгах вэ",
          "JIUDING жилд 4 сая секцийн хүчин чадалтайгаар 600 гаруй төрлийн ган хавтан, баганат, дизайн радиатор болон алчуур хатаагч үйлдвэрлэдэг. EN 442 туршилтын тайлан, CE мэдэгдэл, UKCA баримт бичиг [баримт бичгийн төвд](/mn/documents), гэрчилгээний товчоо [«Гэрчилгээ» хуудсанд](/mn/credentials) бий. Төслийн тусгай өгөгдөл — өндөр, өнгө, холболтын төрлийн захиалгат хувилбар — шаардлагатай бол инженерийн баг загвар тус бүрийн хүчин чадлын хүснэгтийг гаргаж өгнө.",
        ],
      },
      es: {
        title: "Entender la norma EN 442: qué significan realmente las potencias a ΔT50 y ΔT30",
        excerpt:
          "La EN 442 es la norma detrás de cada cifra de potencia de radiador vendida en Europa. Guía para compradores: ΔT50, ΔT30, el exponente característico n y cómo leer un informe de ensayo antes de firmar un contrato de suministro.",
        body: [
          "Todo radiador vendido legalmente en la Unión Europea declara una potencia térmica medida según la EN 442. Sin embargo, en compras B2B vemos con frecuencia licitaciones que comparan cifras incomparables: potencias a regímenes distintos, valores sin ΔT declarado o números de catálogo sin informe de ensayo detrás. Esta guía explica qué mide realmente la norma y qué debe comprobar un comprador antes de firmar un contrato de suministro.",
          "## Qué cubre la EN 442",
          "La EN 442 es la norma europea armonizada para radiadores y convectores que funcionan por debajo de 120 °C. La parte 1 define especificaciones y requisitos técnicos: materiales, estanqueidad a presión, acabado superficial, marcado. La parte 2 define el método de ensayo de la emisión térmica: el radiador se mide en una cabina cerrada y refrigerada de un laboratorio notificado, en el régimen estándar 75/65/20 — ida a 75 °C, retorno a 65 °C y aire a 20 °C. Al estar armonizada bajo el Reglamento de Productos de Construcción, un radiador en el mercado de la UE debe llevar marcado CE con una declaración de prestaciones basada en estos ensayos.",
          "## ΔT50 en términos sencillos",
          "La cifra principal del ensayo EN 442 es la potencia a ΔT50. El ΔT —o salto térmico— es la diferencia entre la temperatura media del agua y el aire de la habitación: (75 + 65) / 2 − 20 = 50 K. Cuando una ficha dice «1460 W», significa 1460 W con el agua a 70 °C de media en una habitación a 20 °C. Si su instalación trabaja con agua más fría —y la mayoría de las modernas lo hacen—, la emisión real será menor. Este único hecho explica la mayoría de las quejas de «radiadores que no calientan» que encontramos en proyectos.",
          "## La ecuación característica y el exponente n",
          "Un ensayo EN 442 no produce un número sino una curva, descrita por la ecuación característica Φ = Km × ΔT^n. Km es una constante del modelo; el exponente n describe con qué pendiente cae la emisión al enfriarse el agua. En radiadores de acero de panel y tubulares, n suele rondar 1,3. El informe de ensayo recoge ambos valores, lo que permite calcular la potencia a cualquier régimen, no solo a los dos impresos en el catálogo. Al comparar proveedores, pida Km y n: dos radiadores con idéntica potencia a ΔT50 pero distinto exponente se comportarán de forma diferente en una instalación de baja temperatura.",
          "## Por qué ΔT30 se ha convertido en la segunda cifra clave",
          "Con bombas de calor y calderas de condensación, las temperaturas de diseño han bajado a 40–55 °C, lo que corresponde a un ΔT de unos 25–35 K. A ΔT30 un radiador de acero entrega cerca del 51 % de su potencia a ΔT50 (0,6^1,3 ≈ 0,515). Los mercados que electrifican su calefacción —España, Francia, Reino Unido— exigen cada vez más ambas cifras juntas. Las [páginas de producto de JIUDING](/es/products) muestran la emisión a ΔT50 y ΔT30 para cada serie.",
          "## Cómo leer un informe de ensayo: lista de comprobación del comprador",
          "Al homologar un proveedor de radiadores, solicite los informes EN 442 y compruebe cinco puntos. Uno: el laboratorio emisor — debe ser un organismo notificado reconocido (el rendimiento térmico de JIUDING está validado por BSRIA en el Reino Unido, lo que cubre también la conformidad UKCA). Dos: que los modelos y tamaños ensayados cubran realmente la gama que va a comprar — interpolar entre tamaños ensayados es legítimo; extrapolar fuera de ellos, no. Tres: la presencia de los valores Km y n, no solo un vatiaje único. Cuatro: la coherencia entre informe, declaración de prestaciones y catálogo. Cinco: los datos de presión — la EN 442 exige estanqueidad; JIUDING además prueba cada unidad de producción a 1,5 veces la presión de trabajo dentro de su control de procesos ISO 9001.",
          "## Señales de alerta en la documentación de un proveedor",
          "Potencias citadas sin referencia de ΔT. Cifras de catálogo superiores al informe de ensayo para el mismo tamaño. La fórmula «equivalente a EN 442» sin informe real. Un único certificado reciclado entre generaciones de producto visiblemente distintas. Nada de esto significa automáticamente mal producto, pero cada punto justifica preguntar más antes de comprometer volumen.",
          "## Dónde verificar nuestra documentación",
          "JIUDING fabrica radiadores de acero de panel, tubulares, de diseño y toalleros con una capacidad anual de 4 millones de elementos y más de 600 especificaciones. Nuestros informes EN 442, declaraciones CE y documentación UKCA están disponibles en el [centro de documentación](/es/documents), con los certificados resumidos en la página de [Certificados](/es/credentials). Para datos de proyecto —alturas, colores o conexiones especiales— nuestro equipo técnico facilita tablas de potencia por modelo bajo petición.",
        ],
      },
    },
  },
  {
    slug: "steel-radiators-extreme-cold-mongolia",
    date: "2026-06-11",
    content: {
      mn: {
        title: "Эрс тэс хүйтэн уур амьсгалд яагаад ган радиатор тохиромжтой вэ",
        excerpt:
          "−30…−40 °C-ийн өвөлтэй Монголын нөхцөлд радиаторт тавигдах шаардлага Европынхоос өөр. Ган радиаторын давуу тал, 150 Вт/м² гэсэн сонголтын жишиг, мөн JIUDING Монголын зах зээлд ажилласан 5 жилийн туршлагын тухай.",
        body: [
          "Улаанбаатар бол дэлхийн хамгийн хүйтэн нийслэл: 1-р сарын шөнийн температур −30…−40 °C хүрч, халаалтын улирал 8–9 сар үргэлжилнэ. Ийм нөхцөлд радиатор бол тав тухын асуудал биш, барилгын найдвартай ажиллагааны асуудал. Энэ нийтлэлд эрс тэс уур амьсгалд ган радиатор яагаад зохимжтойг, Монголд хэвшсэн 150 Вт/м² жишгээр хэрхэн сонголт хийхийг тайлбарлая.",
          "## Монголын халаалтын нөхцөл юугаараа онцлог вэ",
          "Гурван хүчин зүйл Монголын системийг Европынхоос ялгадаг. Нэгд, температурын горим: төвлөрсөн халаалт хамгийн хүйтэн үед өндөр температурын усаар ажилладаг тул радиатор урт хугацааны халуун ачааллыг даах ёстой. Хоёрт, даралт: олон давхар барилгын төвлөрсөн системд ажлын даралт өндөр бөгөөд улирлын эхэнд даралтын туршилт, гидравлик цохилт тохиолддог. Гуравт, ашиглалтын хугацаа: жилийн дөрөвний гурав нь халаалттай тул дулааны мөчлөгийн ачаалал — халах, хөрөх давталт — сүүлийн үзүүлэлтээрээ Европын зах зээлийнхээс хамаагүй их.",
          "## Эрс тэс нөхцөлд ган радиаторын давуу тал",
          "Ган нь эдгээр гурван шаардлагад яг тохирдог. Гагнасан ган хийц өндөр температурт хэв гажилтгүй, дулааны мөчлөгийг сайн даадаг. Даралтын хувьд: JIUDING-ийн ган радиаторууд 1,0 МПа (10 бар) ажлын даралттай бөгөөд төхөөрөмж бүр үйлдвэрт ажлын даралтаас 1,5 дахин өндөр даралтаар туршигддаг — энэ нь олон давхар барилгын төвлөрсөн системийн даралтын туршилтыг нөөцтэйгөөр давна гэсэн үг. Хийцийн хувьд 1,2 мм-ээс дээш хананы зузаан нь зэврэлтийн нөөцийг хангадаг. Эцэст нь, ган нь жигд өндөр дулаан өгөлттэй: ижил хэмжээний дотор олон баганат болон хавтан хийц их талбайгаас дулаан тараадаг тул хүйтэн цонхны доорх «хүйтэн урсгалыг» таслахад үр дүнтэй.",
          "## Бүрхүүл ба зэврэлтийн хамгаалалт",
          "Төвлөрсөн системийн усны чанар хэлбэлзэлтэй байдаг тул зэврэлтийн хамгаалалт онцгой чухал. Хоёр энгийн дүрэм радиаторын эдэлгээг мэдэгдэхүйц уртасгана: угсрахын өмнө системээ угааж, шүүлтүүр суурилуулах; улирлын завсарлагад радиаторыг ус юүлэлгүй, дүүргэлттэй орхих — хоосон радиаторын дотоод гадаргуу агаарт илүү хурдан зэврэдэг. Гадна талын хувьд цахилгаан статик аргаар түрхсэн нунтаг будгийн бүрхүүл өндөр температурт өнгөө алдахгүй, цэвэрлэхэд хялбар бөгөөд RAL стандартын дурын өнгөөр захиалах боломжтой.",
          "## 150 Вт/м² гэж юу вэ",
          "Монголын зах зээлд радиаторыг ваттаар биш, халаах талбайгаар ярих нь хэвшсэн: 150 Вт/м² гэдэг нь нэг ам метр талбайг халаахад дунджаар 150 Вт хүчин чадал шаардлагатай гэсэн орон нутгийн зураг төслийн жишиг юм. Энэ тоо Европын 60–110 Вт/м²-аас өндөр нь санамсаргүй биш: гадна агаарын зураг төслийн температур хамаагүй доогуур, барилгын дулаан алдагдал их. Жишээ: 20 м² өрөөнд 20 × 150 = 3000 Вт хэрэгтэй. Сонгосон загварын нэг секц 150 Вт өгдөг бол 20 секц, 200 Вт өгдөг бол 15 секц шаардлагатай. Сонголтыг хялбарчлахын тулд [JIUDING-ийн бүтээгдэхүүний хуудсууд](/mn/products) Монголын зах зээлд зориулж хүчин чадлын хажуугаар 150 Вт/м²-ээр тооцсон «Халаах талбай» баганыг харуулдаг.",
          "## Сонголтод анхаарах дөрвөн зүйл",
          "Нэг: булангийн болон хойд талын өрөөнд жишиг утга дээр 10–15 % нэмнэ, том цонхтой бол мөн адил. Хоёр: холболтын төрөл — хажуугийн ба доод холболтын аль нь таны системд тохирохыг урьдчилан шийднэ; доод холболттой загвар нь шугам хоолойг шалан дор нуусан шинэ барилгад түгээмэл. Гурав: өндрийн сонголт — цонхны доорх 300–600 мм загвар агаарын хөшиг үүсгэхэд тохиромжтой бол 1500–1800 мм босоо загвар нарийн хананд их хүчин чадал өгнө. Дөрөв: даралтын баримт — нийлүүлэгчээс үйлдвэрийн туршилтын баримтыг заавал шаардаарай. Тооцооллоо [радиаторын тооцоолуураар](/mn/calculator) шалгаж болно.",
          "## JIUDING Монголын зах зээлд: 5 жил",
          "JIUDING Монголын зах зээлд тав дахь жилдээ ажиллаж байгаа бөгөөд өнөөдөр зах зээлийн ойролцоогоор 40 %-ийг эзэлж байна — энэ нь Улаанбаатарын орон сууц, олон нийтийн барилгуудад олон мянган радиатор маань өвөл бүр ажиллаж байна гэсэн үг. Тяньжин дахь 45 000 м² үйлдвэр 8 автомат шугамтай, жилд 4 сая секц үйлдвэрлэх хүчин чадалтай. Бүтээгдэхүүний дулааны үзүүлэлт Европын EN 442 стандартаар туршигдсан, чанарын удирдлага ISO 9001-ээр баталгаажсан. Гэрчилгээ, туршилтын тайланг [«Гэрчилгээ» хуудас](/mn/credentials) болон [баримт бичгийн төвөөс](/mn/documents) үзэж болно.",
          "Импортлогч, барилгын төслийн захиалагчдад: төслийнхөө талбай, давхрын тоо, холболтын төрлийг бидэнд илгээвэл 600 гаруй төрлийн хэмжээнээс тохирох цуврал, секцийн тооцоог хамт бэлтгэж өгнө. Түгээмэл асуултын хариуг [FAQ хуудаснаас](/mn/faq) үзнэ үү.",
        ],
      },
      en: {
        title: "Why Steel Radiators Suit Extreme Cold Climates",
        excerpt:
          "Mongolian winters of −30…−40 °C place demands on radiators that differ from European norms. The advantages of steel, the local 150 W/m² sizing convention, and JIUDING's five years on the Mongolian market.",
        body: [
          "Ulaanbaatar is the coldest capital city in the world: January nights reach −30…−40 °C and the heating season lasts 8–9 months. In such conditions a radiator is not a comfort question but a building reliability question. This article explains why steel radiators suit extreme cold, and how to size them using the 150 W/m² convention established in Mongolia.",
          "## What makes Mongolian heating conditions special",
          "Three factors distinguish Mongolian systems from European ones. First, the temperature regime: district heating runs high-temperature water during the coldest spells, so radiators must withstand sustained thermal load. Second, pressure: working pressure in multi-storey district systems is high, with pressure tests and water hammer at the start of each season. Third, operating hours: heating runs three quarters of the year, so thermal cycling — repeated heating and cooling — far exceeds what radiators see on European markets.",
          "## Steel's advantages in extreme cold",
          "Steel matches these three requirements precisely. Welded steel construction tolerates high temperatures without distortion and handles thermal cycling well. On pressure: JIUDING steel radiators are rated 1.0 MPa (10 bar) working pressure, and every unit is factory-tested at 1.5× working pressure — comfortably above the pressure tests of high-rise district systems. Structurally, wall thickness from 1.2 mm provides a corrosion reserve. Finally, steel delivers consistently high output: multi-column and panel designs radiate from a large surface within compact dimensions, which is effective at cutting the cold downdraught under windows.",
          "## Coating and corrosion protection",
          "Because water quality in district systems varies, corrosion protection deserves particular attention. Two simple rules considerably extend a radiator's life: flush the system and fit a strainer before installation; and leave radiators filled with water during the off-season rather than drained — the internal surfaces of an empty radiator corrode faster in air. Externally, an electrostatically applied powder coating keeps its colour at high temperatures, is easy to clean and can be ordered in any RAL standard colour.",
          "## What 150 W/m² means",
          "On the Mongolian market radiators are discussed not in watts but in heated area: 150 W/m² is the local design convention — on average 150 W of output per square metre of floor. That this exceeds the European 60–110 W/m² is no accident: outdoor design temperatures are far lower and building heat losses higher. Example: a 20 m² room needs 20 × 150 = 3000 W. If the chosen model delivers 150 W per section, you need 20 sections; at 200 W per section, 15. To simplify selection, [JIUDING product pages](/en/products) show a heated-area column calculated at 150 W/m² alongside wattage for the Mongolian market.",
          "## Four things to check when selecting",
          "One: add 10–15% to the baseline for corner and north-facing rooms, and likewise for large glazing. Two: connection type — decide in advance between side and bottom connection; bottom-connection models are common in new buildings with pipework concealed in the floor. Three: height — 300–600 mm models under windows create an air curtain, while 1500–1800 mm verticals deliver high output on narrow walls. Four: pressure documentation — always require factory test evidence from the supplier. You can check your calculation with our [radiator calculator](/en/calculator).",
          "## JIUDING on the Mongolian market: 5 years",
          "JIUDING is now in its fifth year on the Mongolian market and holds roughly a 40% market share — meaning thousands of our radiators work through every winter in Ulaanbaatar's residential and public buildings. Our 45,000 m² factory in Tianjin runs 8 automated lines with an annual capacity of 4 million sections. Thermal performance is tested to the European EN 442 standard and quality management is certified to ISO 9001. Certificates and test reports are available on the [credentials page](/en/credentials) and in the [documentation centre](/en/documents).",
          "For importers and construction project clients: send us your project's floor areas, storey count and connection type, and we will prepare a matching series and section calculation from over 600 specifications. Common questions are answered in the [FAQ](/en/faq).",
        ],
      },
      ru: {
        title: "Почему стальные радиаторы подходят для экстремально холодного климата",
        excerpt:
          "Монгольская зима с −30…−40 °C предъявляет к радиаторам требования, отличные от европейских. Преимущества стали, местный норматив подбора 150 Вт/м² и пять лет работы JIUDING на рынке Монголии.",
        body: [
          "Улан-Батор — самая холодная столица мира: январские ночи достигают −30…−40 °C, а отопительный сезон длится 8–9 месяцев. В таких условиях радиатор — это вопрос не комфорта, а надёжности здания. Разберём, почему стальные радиаторы подходят для экстремального холода и как подбирать их по принятому в Монголии нормативу 150 Вт/м².",
          "## Чем особенны условия отопления в Монголии",
          "Три фактора отличают монгольские системы от европейских. Первый — температурный режим: центральное отопление в самые холодные периоды работает на высокотемпературной воде, и прибор должен выдерживать длительную тепловую нагрузку. Второй — давление: в многоэтажных домах с центральным отоплением рабочее давление высокое, а в начале сезона случаются опрессовки и гидроудары. Третий — наработка: отопление работает три четверти года, поэтому циклические тепловые нагрузки — повторные нагревы и остывания — значительно превышают показатели европейских рынков.",
          "## Преимущества стали в экстремальный холод",
          "Сталь точно отвечает этим трём требованиям. Сварная стальная конструкция переносит высокие температуры без деформаций и хорошо выдерживает термоциклирование. По давлению: стальные радиаторы JIUDING рассчитаны на рабочее давление 1,0 МПа (10 атм), и каждый прибор проходит заводское испытание давлением в 1,5 раза выше рабочего — с запасом относительно опрессовок высотных систем. Конструктивно толщина стенки от 1,2 мм даёт запас на коррозию. Наконец, сталь обеспечивает стабильно высокую теплоотдачу: многоколончатые и панельные конструкции излучают с большой поверхности при компактных габаритах, что эффективно отсекает холодный поток от окон.",
          "## Покрытие и защита от коррозии",
          "Поскольку качество воды в центральных системах нестабильно, защите от коррозии стоит уделить особое внимание. Два простых правила заметно продлевают ресурс прибора: промойте систему и установите фильтр перед монтажом; в межсезонье оставляйте радиаторы заполненными водой, а не слитыми — внутренние поверхности пустого прибора корродируют на воздухе быстрее. Снаружи электростатически нанесённое порошковое покрытие сохраняет цвет при высоких температурах, легко очищается и доступно в любом цвете по стандарту RAL.",
          "## Что означает 150 Вт/м²",
          "На монгольском рынке радиаторы обсуждают не в ваттах, а в отапливаемой площади: 150 Вт/м² — местный проектный норматив, в среднем 150 Вт мощности на квадратный метр пола. Превышение европейских 60–110 Вт/м² не случайно: расчётные наружные температуры значительно ниже, теплопотери зданий выше. Пример: комнате 20 м² нужно 20 × 150 = 3000 Вт. Если секция выбранной модели отдаёт 150 Вт, потребуется 20 секций; при 200 Вт — 15. Для удобства подбора на [страницах продукции JIUDING](/ru/products) для монгольского рынка рядом с мощностью указана отапливаемая площадь из расчёта 150 Вт/м².",
          "## Четыре пункта проверки при подборе",
          "Первый: для угловых и северных комнат прибавьте к нормативу 10–15 %, то же — при большом остеклении. Второй: тип подключения — заранее решите между боковым и нижним; модели с нижним подключением распространены в новостройках со скрытой в полу разводкой. Третий: высота — модели 300–600 мм под окнами создают тепловую завесу, а вертикальные 1500–1800 мм дают высокую мощность на узких стенах. Четвёртый: документы по давлению — всегда требуйте у поставщика подтверждение заводских испытаний. Проверить расчёт можно в [калькуляторе радиаторов](/ru/calculator).",
          "## JIUDING на рынке Монголии: 5 лет",
          "JIUDING работает на монгольском рынке пятый год и занимает около 40 % рынка — тысячи наших приборов проходят каждую зиму в жилых и общественных зданиях Улан-Батора. Завод 45 000 м² в Тяньцзине с 8 автоматическими линиями выпускает 4 млн секций в год. Тепловые характеристики испытаны по европейскому стандарту EN 442, менеджмент качества сертифицирован по ISO 9001. Сертификаты и протоколы испытаний — на странице [«Сертификаты»](/ru/credentials) и в [центре документации](/ru/documents).",
          "Импортёрам и заказчикам строительных проектов: пришлите площади помещений, этажность и тип подключения — подготовим подходящую серию и расчёт секций из более чем 600 типоразмеров. Ответы на частые вопросы — в [FAQ](/ru/faq).",
        ],
      },
      es: {
        title: "Por qué los radiadores de acero son idóneos para climas extremadamente fríos",
        excerpt:
          "Los inviernos de Mongolia, con −30…−40 °C, imponen a los radiadores exigencias distintas de las europeas. Las ventajas del acero, la convención local de 150 W/m² y los cinco años de JIUDING en el mercado mongol.",
        body: [
          "Ulán Bator es la capital más fría del mundo: las noches de enero alcanzan −30…−40 °C y la temporada de calefacción dura 8–9 meses. En esas condiciones el radiador no es una cuestión de confort sino de fiabilidad del edificio. Este artículo explica por qué los radiadores de acero son idóneos para el frío extremo y cómo dimensionarlos con la convención de 150 W/m² establecida en Mongolia.",
          "## Qué hace especiales las condiciones de calefacción en Mongolia",
          "Tres factores distinguen los sistemas mongoles de los europeos. Primero, el régimen de temperaturas: la calefacción urbana funciona con agua a alta temperatura en los períodos más fríos, y el emisor debe soportar una carga térmica sostenida. Segundo, la presión: en los sistemas urbanos de edificios altos la presión de trabajo es elevada, con pruebas de presión y golpes de ariete al inicio de cada temporada. Tercero, las horas de funcionamiento: la calefacción opera tres cuartas partes del año, por lo que el ciclado térmico —calentamientos y enfriamientos repetidos— supera con mucho el de los mercados europeos.",
          "## Las ventajas del acero en frío extremo",
          "El acero responde con precisión a esas tres exigencias. La construcción soldada de acero tolera altas temperaturas sin deformarse y soporta bien el ciclado térmico. En presión: los radiadores de acero JIUDING tienen una presión de trabajo de 1,0 MPa (10 bar) y cada unidad se prueba en fábrica a 1,5 veces la presión de trabajo, con margen sobre las pruebas de los sistemas urbanos en altura. Estructuralmente, el espesor de pared desde 1,2 mm aporta reserva frente a la corrosión. Por último, el acero ofrece una emisión alta y constante: los diseños de varias columnas y de panel radian desde una gran superficie en dimensiones compactas, eficaz para cortar la corriente fría bajo las ventanas.",
          "## Acabado y protección anticorrosión",
          "Como la calidad del agua en los sistemas urbanos es variable, la protección contra la corrosión merece atención especial. Dos reglas sencillas alargan notablemente la vida del emisor: lavar la instalación e instalar un filtro antes del montaje; y dejar los radiadores llenos de agua fuera de temporada en lugar de vaciarlos — las superficies internas de un radiador vacío se corroen más rápido en contacto con el aire. En el exterior, el recubrimiento en polvo aplicado electrostáticamente conserva el color a altas temperaturas, se limpia con facilidad y puede pedirse en cualquier color RAL.",
          "## Qué significa 150 W/m²",
          "En el mercado mongol los radiadores no se discuten en vatios sino en superficie calefactada: 150 W/m² es la convención local de diseño — de media, 150 W de potencia por metro cuadrado de suelo. Que supere los 60–110 W/m² europeos no es casual: las temperaturas exteriores de diseño son mucho más bajas y las pérdidas térmicas, mayores. Ejemplo: una habitación de 20 m² necesita 20 × 150 = 3000 W. Si el modelo elegido entrega 150 W por elemento, hacen falta 20 elementos; con 200 W, 15. Para simplificar la selección, las [páginas de producto de JIUDING](/es/products) muestran para el mercado mongol una columna de superficie calefactada calculada a 150 W/m² junto a la potencia.",
          "## Cuatro comprobaciones al seleccionar",
          "Una: añada un 10–15 % a la referencia en habitaciones de esquina u orientadas al norte, e igualmente con grandes acristalamientos. Dos: tipo de conexión — decida de antemano entre lateral e inferior; los modelos de conexión inferior son habituales en obra nueva con tuberías ocultas en el suelo. Tres: la altura — los modelos de 300–600 mm bajo ventana crean una cortina de aire, mientras que los verticales de 1500–1800 mm dan gran potencia en paredes estrechas. Cuatro: documentación de presión — exija siempre al proveedor la evidencia del ensayo de fábrica. Puede verificar su cálculo con nuestra [calculadora de radiadores](/es/calculator).",
          "## JIUDING en el mercado mongol: 5 años",
          "JIUDING cumple su quinto año en el mercado mongol con una cuota aproximada del 40 % — miles de nuestros radiadores funcionan cada invierno en edificios residenciales y públicos de Ulán Bator. Nuestra fábrica de 45 000 m² en Tianjin, con 8 líneas automatizadas, tiene una capacidad anual de 4 millones de elementos. El rendimiento térmico está ensayado según la norma europea EN 442 y la gestión de calidad certificada por ISO 9001. Los certificados e informes de ensayo están en la página de [Certificados](/es/credentials) y en el [centro de documentación](/es/documents).",
          "Para importadores y clientes de proyectos de construcción: envíennos las superficies, el número de plantas y el tipo de conexión, y prepararemos la serie adecuada y el cálculo de elementos entre más de 600 especificaciones. Las preguntas frecuentes se responden en el [FAQ](/es/faq).",
        ],
      },
    },
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function formatPostDate(date: string, locale: Locale): string {
  try {
    return new Date(`${date}T00:00:00Z`).toLocaleDateString(
      locale === "en" ? "en-GB" : locale,
      { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }
    );
  } catch {
    return date;
  }
}
