import type { User, BadgeInfo, Modules, RankingUser, QuizData } from './types';

export const ALL_BADGES: BadgeInfo[] = [
    { id: 'b01', name: 'Iniciador Digital', desc: 'Completa el primer mòdul', icon: '🌱', color: 'teal' },
    { id: 'b02', name: 'Guardià del Temps', desc: 'Aprèn a gestionar el temps de pantalla', icon: '⏳', color: 'sky' },
    { id: 'b03', name: 'Mestre del Joc', desc: 'Supera els reptes de ludopatia', icon: '🎮', color: 'indigo' },
    { id: 'b04', name: 'Comunicador Conscient', desc: 'Domina la comunicació a les xarxes', icon: '💬', color: 'rose' },
    { id: 'b05', name: 'Expert en Privacitat', desc: 'Protegeix les teves dades personals', icon: '🛡️', color: 'amber' },
    { id: 'b06', name: 'Campió del Benestar', desc: 'Completa tota la formació', icon: '🏆', color: 'lime' },
];

export const CHALLENGES_DATA = {
    FAKE_NEWS_HUNTER: {
        type: 'quiz',
        pointsPerCorrect: 75,
        questions: [
            { 
                q: 'Llegeixes aquest titular: "INCREÏBLE: Científics descobreixen que menjar xocolata negra cada dia cura la miopia". Quina és la principal senyal d\'alerta?', 
                options: ['L\'estudi va ser publicat en una revista poc coneguda', 'El titular utilitza un llenguatge sensacionalista i promet una solució miraculosa', 'La xocolata negra té antioxidants'], 
                answer: 1,
                explanation: 'Els titulars que utilitzen paraules com "INCREÏBLE", "SECRET" o prometen cures miraculoses són una gran senyal d\'alerta de desinformació.'
            },
            { 
                q: 'Veus una publicació a Facebook d\'un blog desconegut que afirma que tancaran totes les escoles la setmana vinent. Què hauries de fer primer?', 
                options: ['Compartir-ho immediatament per avisar a tothom', 'Buscar la notícia en fonts oficials (mitjans de comunicació fiables, web del govern) abans de creure-ho', 'Preguntar als comentaris si la informació és certa'], 
                answer: 1,
                explanation: 'La regla d\'or és sempre verificar. Abans de compartir o creure una informació impactant, comprova si fonts fiables i reconegudes també ho estan reportant.'
            },
            {
                q: 'Un amic t\'envia un àudio per WhatsApp dient que beure aigua calenta amb llimona preveu una malaltia greu. Què li hauries de dir?',
                options: ['"Gràcies per la informació, ho provaré ara mateix!"', '"No estic segur, però sembla interessant. Ho comparteixo per si de cas."', '"Aquesta informació sembla un rumor. És millor consultar fonts mèdiques oficials per a consells de salut."'],
                answer: 2,
                explanation: 'És important tallar la cadena de desinformació. Aconsellar al teu amic que consulti fonts expertes és la forma més responsable d\'actuar.'
            }
        ],
    } as QuizData
};


export const MODULES_DATA: Modules = {
    'm01-01': {
        title: '1. El teu mòbil i tu',
        subtitle: 'Comprendre la teva relació amb el dispositiu i els seus efectes.',
        videoUrl: '/assets/video-m01-01.mp4',
        content: [
            'La nostra relació amb el telèfon mòbil és cada cop més estreta. Aquests dispositius s\'han convertit en una extensió de nosaltres mateixos, però és crucial entendre com ens afecten. Les aplicacions i xarxes socials estan dissenyades per captar la nostra atenció el màxim temps possible.',
            'Això ho aconsegueixen a través de mecanismes de recompensa variable, similars als de les màquines escurabutxaques. Cada "m\'agrada", comentari o notificació allibera una petita dosi de dopamina al nostre cervell, el neurotransmissor del plaer, creant un cicle que ens incita a tornar-hi constantment.'
        ],
        activity: {
            type: 'quiz',
            pointsPerCorrect: 50,
            questions: [
                { q: 'Quin és el principal neurotransmissor associat a les recompenses de les xarxes socials?', options: ['Serotonina', 'Dopamina', 'Adrenalina'], answer: 1 },
                { q: 'L\'ús excessiu del mòbil abans de dormir pot afectar negativament...', options: ['La gana', 'La qualitat del son', 'L\'equilibri'], answer: 1 },
            ],
        },
        status: 'inprogress',
        progress: 0,
    },
    'm01-02': {
        title: '2. Notificacions: amigues o enemigues?',
        subtitle: 'Aprèn a gestionar les alertes per recuperar el teu focus i la teva pau.',
        videoUrl: '/assets/video-m01-02.mp4',
        content: [
            'Les notificacions són la principal eina que utilitzen les aplicacions per cridar la nostra atenció. Encara que algunes són útils, la majoria són interrupcions constants que fragmenten la nostra concentració i augmenten l\'estrès.',
            'Aprendre a gestionar-les és fonamental per al nostre benestar digital. Desactivar les notificacions no essencials, utilitzar modes de concentració com "No molestar" i establir horaris concrets per revisar el mòbil són estratègies efectives per recuperar el control del nostre temps i atenció.'
        ],
        activity: {
            type: 'drag-drop-scenario',
            prompt: 'Classifica aquests comportaments segons si són una bona pràctica o una interrupció constant.',
            points: 100,
            items: [
                { id: 'item1', content: 'Revisar el mòbil cada vegada que vibra', type: 'risk' },
                { id: 'item2', content: 'Consultar el correu només 3 cops al dia', type: 'healthy' },
                { id: 'item3', content: 'Activar el mode "No molestar" mentre treballes', type: 'healthy' },
                { id: 'item4', content: 'Tenir totes les notificacions de xarxes socials activades', type: 'risk' },
            ],
            dropZones: [
                { id: 'zone1', title: 'Mala Pràctica (Interrupció)', accepts: 'risk' },
                { id: 'zone2', title: 'Bona Pràctica (Gestió)', accepts: 'healthy' },
            ],
        },
        status: 'inprogress',
        progress: 0,
    },
    'm01-03': {
        title: '3. Temps de pantalla conscient',
        subtitle: 'Estratègies per utilitzar el teu temps digital de manera intencionada.',
        videoUrl: '/assets/video-m01-03.mp4',
        content: [
            'El "temps de pantalla" no és inherentment dolent, però és la qualitat d\'aquest temps el que importa. Passar hores fent "scrolling" infinit sense un propòsit clar ("doomscrolling") pot tenir efectes negatius en el nostre estat d\'ànim.',
            'Practicar un ús conscient significa prendre decisions intencionades sobre què fem amb el nostre temps digital. Abans d\'obrir una aplicació, pregunta\'t: "Què vinc a fer aquí?". Defineix un objectiu clar i tanca l\'app un cop l\'hagis complert. Això transforma l\'ús passiu i reactiu en un ús actiu i amb propòsit.'
        ],
        activity: {
            type: 'reflection-journal',
            prompt: 'Escriu sobre una situació en què vas sentir que perdies el temps amb el mòbil. Què podries haver fet diferent?',
            points: 150,
        },
        status: 'inprogress',
        progress: 0,
    },
    'm02-01': {
        title: '1. Què és la ludopatia?',
        subtitle: 'Introducció als riscos d\'addicció als jocs d\'atzar i videojocs.',
        videoUrl: '/assets/video-m02-01.mp4',
        content: [
            'La ludopatia, o trastorn del joc, és una addicció comportamental caracteritzada per la incapacitat de resistir l\'impuls de jugar, malgrat les conseqüències negatives. No es limita als jocs d\'atzar tradicionals; els videojocs moderns també poden presentar riscos.',
            'Alguns senyals d\'alerta inclouen: pensar constantment en el joc, necessitar jugar amb quantitats creixents de diners o temps per aconseguir la mateixa emoció, intentar controlar, reduir o aturar el joc sense èxit, i mentir a familiars o amics sobre la quantitat de temps o diners invertits.'
        ],
        activity: {
            type: 'quiz',
            pointsPerCorrect: 50,
            questions: [
                { q: 'Quin d\'aquests NO és un senyal d\'alerta de possible ludopatia?', options: ['Mentir sobre el temps o diners gastats jugant', 'Jugar només amb amics un cop al mes', 'Demanar diners per continuar jugant'], answer: 1 },
                { q: 'La "fal·làcia del jugador" és la creença errònia que...', options: ['Els jocs d\'atzar són una forma segura d\'invertir', 'Si un resultat no ha sortit en molt de temps, és més probable que surti aviat', 'Només els experts poden guanyar a llarg termini'], answer: 1 },
            ],
        },
        status: 'inprogress',
        progress: 0,
    },
    'm02-02': {
        title: '2. Mecanismes enganyosos',
        subtitle: 'Descobreix com les "loot boxes" i les microtransaccions fomenten l\'addicció.',
        videoUrl: '/assets/video-m02-02.mp4',
        content: [
            'Molts videojocs actuals incorporen mecanismes que imiten els jocs d\'atzar. Les "loot boxes" o caixes de botí en són l\'exemple més clar: el jugador paga (amb diners reals o virtuals) per un paquet de recompenses aleatòries, sense saber què obtindrà.',
            'Aquesta incertesa activa els mateixos circuits de recompensa cerebral que les màquines escurabutxaques. Altres mecanismes, com les microtransaccions per obtenir avantatges o les recompenses diàries per fomentar l\'hàbit, també poden contribuir a un comportament de joc problemàtic.'
        ],
        activity: {
             type: 'drag-drop-scenario',
            prompt: 'Classifica aquests mecanismes de jocs segons el seu risc addictiu.',
            points: 100,
            items: [
                { id: 'item1', content: '"Loot boxes" (caixes de botí aleatòries)', type: 'risk' },
                { id: 'item2', content: 'Comprar un aspecte cosmètic directament', type: 'healthy' },
                { id: 'item3', content: 'Recompenses per connexió diària', type: 'risk' },
                { id: 'item4', content: 'Expansions de contingut de pagament únic', type: 'healthy' },
            ],
            dropZones: [
                { id: 'zone1', title: 'Alt Risc Addictiu', accepts: 'risk' },
                { id: 'zone2', title: 'Baix Risc Addictiu', accepts: 'healthy' },
            ],
        },
        status: 'inprogress',
        progress: 0,
    },
    'm02-03': {
        title: '3. Joc responsable',
        subtitle: 'Eines i consells per mantenir el joc com una activitat d\'oci segura.',
        videoUrl: '/assets/video-m02-03.mp4',
        content: [
            'Jugar de manera responsable significa mantenir el control i assegurar-se que el joc no afecti negativament altres àrees de la teva vida. Algunes pautes clau són: establir límits estrictes de temps i diners abans de començar a jugar i complir-los.',
            'És important recordar que jugar és una forma d\'entreteniment, no una manera de guanyar diners. Mai intentis recuperar les pèrdues jugant més. Si sents que el joc t\'està causant problemes, és fonamental buscar ajuda professional.'
        ],
        activity: {
            type: 'reflection-journal',
            prompt: 'Escriu tres regles personals que podries establir per assegurar-te que el joc sigui sempre una activitat segura i controlada per a tu.',
            points: 150,
        },
        status: 'inprogress',
        progress: 0,
    },
    'm03-01': {
        title: '1. La bombolla social',
        subtitle: 'Com els algorismes configuren la teva percepció de la realitat.',
        videoUrl: '/assets/video-m03-01.mp4',
        content: [
            'Els algorismes de les xarxes socials aprenen dels nostres "m\'agrada", comparticions i temps de visualització per mostrar-nos més contingut similar. Això crea una "bombolla de filtre" o "cambra d\'eco", on només veiem opinions i notícies que reforcen les nostres creences existents.',
            'Aquesta bombolla pot distorsionar la nostra percepció de la realitat, fent-nos creure que la nostra visió del món és l\'única o la majoritària. Per combatre-ho, és important seguir activament comptes amb perspectives diverses, consultar diferents fonts d\'informació i ser conscients del nostre propi biaix de confirmació.'
        ],
        activity: {
            type: 'quiz',
            pointsPerCorrect: 75,
            questions: [
                { q: 'Un "biaix de confirmació" en xarxes socials significa que l\'algorisme tendeix a mostrar-te...', options: ['Contingut que desafia les teves idees', 'Contingut variat de tot el món', 'Contingut que reforça les teves creences existents'], answer: 2 },
                { q: 'Quina és la millor estratègia per sortir de la teva "bombolla de filtre"?', options: ['Seguir només gent que pensa exactament com tu', 'Buscar activament i seguir fonts amb perspectives diferents', 'No interactuar mai amb el contingut'], answer: 1 },
            ],
        },
        status: 'inprogress',
        progress: 0,
    },
    'm03-02': {
        title: '2. Assetjament digital',
        subtitle: 'Identificar, prevenir i actuar davant del ciberassetjament.',
        videoUrl: '/assets/video-m03-02.mp4',
        content: [
            'El ciberassetjament o "cyberbullying" és l\'ús de mitjans digitals per assetjar, intimidar o danyar una persona o grup. Pot incloure insults, difusió de rumors, publicació d\'informació privada o amenaces. L\'anonimat relatiu d\'internet pot agreujar aquests comportaments.',
            'Davant d\'una situació d\'assetjament, és crucial no respondre a les provocacions. Guarda proves (captures de pantalla), bloqueja els usuaris implicats i denuncia els comptes i els continguts a la plataforma. Si et sents amenaçat, busca suport en persones de confiança i considera denunciar-ho a les autoritats.'
        ],
        activity: {
            type: 'drag-drop-scenario',
            prompt: 'Classifica els següents comentaris en línia.',
            points: 100,
            items: [
                { id: 'item1', content: '"No estic d\'acord amb la teva opinió, però respecto el teu punt de vista."', type: 'healthy' },
                { id: 'item2', content: '"Tothom sap que ets un fracassat, deixa de publicar bestieses."', type: 'risk' },
                { id: 'item3', content: '"Gran article! M\'ha fet pensar molt."', type: 'healthy' },
                { id: 'item4', content: '"He vist on vius, vés amb compte."', type: 'risk' },
            ],
            dropZones: [
                { id: 'zone1', title: 'Ciberassetjament / Discurs d\'odi', accepts: 'risk' },
                { id: 'zone2', title: 'Interacció Respectuosa', accepts: 'healthy' },
            ],
        },
        status: 'inprogress',
        progress: 0,
    },
    'm03-03': {
        title: '3. Desinformació i "fake news"',
        subtitle: 'Desenvolupa el teu sentit crític per navegar en un mar d\'informació.',
        videoUrl: '/assets/video-m03-03.mp4',
        content: [
            'Les "fake news" o notícies falses són informacions enganyoses creades per desinformar o enganyar el públic, sovint amb l\'objectiu de generar ingressos publicitaris o influir en l\'opinió pública. Es propaguen ràpidament a través de les xarxes socials.',
            'Per identificar-les, cal desenvolupar un sentit crític. Desconfia de titulars massa cridaners o emocionals. Verifica sempre la font: és un mitjà de comunicació reconegut? Busca la mateixa notícia en altres fonts fiables abans de compartir-la. La comprovació de fets ("fact-checking") és la nostra millor eina contra la desinformació.'
        ],
        activity: {
            type: 'quiz',
            pointsPerCorrect: 75,
            questions: [
                { q: 'Quin d\'aquests titulars és un senyal d\'alerta de possible "fake news"?', options: ['"Estudi científic troba una correlació entre X i Y"', '"ÚLTIMA HORA: EL SECRET QUE ELS METGES NO VOLEN QUE SÀPIGS!"', '"El govern aprova la nova llei d\'educació"'], answer: 1 },
                { q: 'Abans de compartir una notícia impactant, què és el més important que has de fer?', options: ['Compartir-la immediatament per informar els altres', 'Verificar la informació en fonts fiables i reconegudes', 'Preguntar als teus amics si sembla real'], answer: 1 },
            ],
        },
        status: 'inprogress',
        progress: 0,
    },
};