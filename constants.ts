import type { User, BadgeInfo, Modules, RankingUser } from './types';

export const CURRENT_USER: User = {
    id: 'user1',
    name: 'Àlex',
    points: 1250,
    badges: ['b01', 'b02'],
};

export const ALL_BADGES: BadgeInfo[] = [
    { id: 'b01', name: 'Iniciador Digital', desc: 'Completa el primer mòdul', icon: '🌱', color: 'teal' },
    { id: 'b02', name: 'Guardià del Temps', desc: 'Aprèn a gestionar el temps de pantalla', icon: '⏳', color: 'sky' },
    { id: 'b03', name: 'Mestre del Joc', desc: 'Supera els reptes de ludopatia', icon: '🎮', color: 'indigo' },
    { id: 'b04', name: 'Comunicador Conscient', desc: 'Domina la comunicació a les xarxes', icon: '💬', color: 'rose' },
    { id: 'b05', name: 'Expert en Privacitat', desc: 'Protegeix les teves dades personals', icon: '🛡️', color: 'amber' },
    { id: 'b06', name: 'Campió del Benestar', desc: 'Completa tota la formació', icon: '🏆', color: 'lime' },
];

export const RANKING_DATA: RankingUser[] = [
    { id: 'user2', name: 'Laura G.', points: 2100 },
    { id: 'user3', name: 'Carles P.', points: 1850 },
    { id: 'user1', name: 'Àlex', points: 1250 },
    { id: 'user4', name: 'Marta S.', points: 900 },
    { id: 'user5', name: 'Joan R.', points: 550 },
];

export const MODULES_DATA: Modules = {
    'm01-01': {
        title: '1. El teu mòbil i tu',
        subtitle: 'Comprendre la teva relació amb el dispositiu i els seus efectes.',
        activity: {
            type: 'quiz',
            pointsPerCorrect: 50,
            questions: [
                { q: 'Quin és el principal neurotransmissor associat a les recompenses de les xarxes socials?', options: ['Serotonina', 'Dopamina', 'Adrenalina'], answer: 1 },
                { q: 'L\'ús excessiu del mòbil abans de dormir pot afectar negativament...', options: ['La gana', 'La qualitat del son', 'L\'equilibri'], answer: 1 },
            ],
        },
        status: 'completed',
        progress: 100,
        points: 100
    },
    'm01-02': {
        title: '2. Notificacions: amigues o enemigues?',
        subtitle: 'Aprèn a gestionar les alertes per recuperar el teu focus i la teva pau.',
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
        progress: 50,
    },
    'm01-03': {
        title: '3. Temps de pantalla conscient',
        subtitle: 'Estratègies per utilitzar el teu temps digital de manera intencionada.',
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
        activity: {
            type: 'quiz',
            pointsPerCorrect: 75,
            questions: [
                { q: 'Quin d\'aquests titulars és un senyal d\'alerta de possible "fake news"?', options: ['"Estudi científic troba una correlació entre X i Y"', '"ÚLTIMA HORA: EL SECRET QUE ELS METGES NO VOLEN QUE SÀPIGUES!"', '"El govern aprova la nova llei d\'educació"'], answer: 1 },
                { q: 'Abans de compartir una notícia impactant, què és el més important que has de fer?', options: ['Compartir-la immediatament per informar els altres', 'Verificar la informació en fonts fiables i reconegudes', 'Preguntar als teus amics si sembla real'], answer: 1 },
            ],
        },
        status: 'inprogress',
        progress: 0,
    },
};