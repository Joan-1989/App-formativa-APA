import type { User, BadgeInfo, RankingUser, Modules } from './types';

export const CURRENT_USER: User = { 
    id: 'user004', 
    name: 'Alex', 
    points: 3250, 
    badges: ['b01', 'b02']
};

export const ALL_BADGES: BadgeInfo[] = [
    { id: 'b01', name: 'Inici Ràpid', desc: 'Completa el teu primer mòdul.', icon: '🏆', color: 'teal' },
    { id: 'b02', name: 'Gestor/a d\'Atenció', desc: 'Supera el mòdul sobre el teu perfil digital.', icon: '🎯', color: 'amber' },
    { id: 'b03', name: 'Guardià/na Digital', desc: 'Completa el repte de desconnexió intel·ligent.', icon: '🛡️', color: 'indigo' },
    { id: 'b04', name: 'Heroi/na de la Prevenció', desc: 'Completa la història interactiva "El Camí de la Consciència".', icon: '🦸', color: 'rose' },
    { id: 'b05', name: 'Caçamites', desc: 'Aconsegueix el 100% en el test de mites sobre el joc.', icon: '💡', color: 'blue' },
    { id: 'b06', name: 'Compartidor/a d\'Experiències', desc: 'Participa en el diari de reflexió "El teu consell d\'or".', icon: '✍️', color: 'orange' }
];

export const RANKING_DATA: RankingUser[] = [
    { id: 'user001', name: 'Usuari_Alfa', points: 4100 },
    { id: 'user002', name: 'Usuari_Beta', points: 3850 },
    { id: 'user003', name: 'Usuari_Gamma', points: 3400 },
    { id: 'user004', name: 'Alex', points: 3250 },
    { id: 'user005', name: 'Usuari_Delta', points: 2900 },
    { id: 'user006', name: 'Usuari_Epsilon', points: 2500 }
];

export const MODULES_DATA: Modules = {
    // Eix 1: Ús saludable del mòbil
    'm01p01': {
        title: '1. El teu perfil digital equilibrat',
        subtitle: 'Pren decisions per equilibrar feina i benestar.',
        status: 'completed',
        progress: 100,
        points: 50,
        activity: {
            type: 'quiz',
            pointsPerCorrect: 25,
            questions: [
                { q: "Estàs atenent un client i reps una notificació personal al mòbil. Què fas?", options: ["Miro ràpidament la notificació.", "Ignoro el mòbil i em centro en el client.", "Demano un moment al client per revisar el mòbil."], answer: 1 },
                { q: "Un company et demana ajuda mentre navegues per xarxes socials en un moment de poca feina. La teva reacció és:", options: ["Li dic que esperi un moment.", "Deixo el mòbil a l'instant i l'ajudo.", "L'ajudo mentre continuo mirant el mòbil de reüll."], answer: 1 },
            ]
        }
    },
    'm01p02': {
        title: '2. Detector de senyals d\'alerta',
        subtitle: 'Identifica hàbits digitals de risc.',
        status: 'inprogress',
        progress: 50,
        activity: {
            type: 'drag-drop-scenario',
            prompt: 'Classifica aquests comportaments segons si són un senyal d\'alerta o un ús normal del mòbil.',
            points: 100,
            items: [
                {id: 'i1', content: 'Consultar el mòbil cada 5 minuts.', type: 'risk'},
                {id: 'i2', content: 'Silenciar el mòbil durant reunions.', type: 'healthy'},
                {id: 'i3', content: 'Sentir ansietat si no tens el mòbil a prop.', type: 'risk'},
                {id: 'i4', content: 'Utilitzar el mòbil per desconnectar a l\'hora de dinar.', type: 'healthy'},
                {id: 'i5', content: 'Deixar de fer activitats que t\'agradaven per estar amb el mòbil.', type: 'risk'},
            ],
            dropZones: [
                {id: 'dz1', title: 'Ús Normal', accepts: 'healthy'},
                {id: 'dz2', title: 'Senyal d\'Alerta', accepts: 'risk'},
            ]
        }
    },
    'm01p03': {
        title: '3. Repte: Desconnexió intel·ligent',
        subtitle: 'Reflexiona sobre un dia amb menys notificacions.',
        status: 'inprogress',
        progress: 0,
        activity: {
            type: 'reflection-journal',
            prompt: 'Després de provar de desactivar les notificacions no essencials durant un dia, reflexiona: Quins beneficis has notat? Quines han estat les principals dificultats que has trobat?',
            points: 150,
        }
    },
    // Eix 2: Ludopatia i joc problemàtic
    'm02p01': {
        title: '1. El Camí de la Consciència',
        subtitle: 'Una història interactiva sobre la prevenció.',
        status: 'locked',
        progress: 0,
        activity: {
            type: 'quiz',
            pointsPerCorrect: 50,
            questions: [
                { q: "Un client habitual comença a demanar petits préstecs i sembla més ansiós. Com a professional, què fas?", options: ["No m'hi fico, és la seva vida privada.", "Li pregunto discretament si tot va bé i li recordo on trobar informació sobre joc responsable.", "Li comento la situació a altres clients."], answer: 1 },
                { q: "Un company de feina et confessa que ha perdut diners que no es podia permetre. Quina és la teva millor resposta?", options: ["Dir-li que no es preocupi, que ja els recuperarà.", "Jutjar la seva decisió i dir-li que ha estat imprudent.", "Escoltar-lo sense jutjar, mostrar-li suport i suggerir-li parlar amb un professional."], answer: 2 },
            ]
        }
    },
    'm02p02': {
        title: '2. Mites i realitats sobre el joc',
        subtitle: 'Desmentint creences populars.',
        status: 'locked',
        progress: 0,
        activity: {
            type: 'quiz',
            pointsPerCorrect: 50,
            questions: [
                { q: "Mite o Realitat: Una persona ludòpata pot deixar de jugar quan vulgui, només li cal força de voluntat.", options: ["Mite", "Realitat"], answer: 0 },
                { q: "Mite o Realitat: El joc és només un problema si es perden diners.", options: ["Mite", "Realitat"], answer: 0 },
                { q: "Mite o Realitat: Si portes molt de temps perdent, estàs 'a punt de guanyar'.", options: ["Mite", "Realitat"], answer: 0 },
            ]
        }
    },
    // Eix 3: Altres addiccions socials
    'm03p01': {
        title: '1. Simulació: Compres i xarxes socials',
        subtitle: 'Decisions ràpides en situacions quotidianes.',
        status: 'locked',
        progress: 0,
        activity: {
            type: 'quiz',
            pointsPerCorrect: 75,
            questions: [
                { q: "Has tingut un mal dia a la feina. Quina opció és més saludable per gestionar l'estrès?", options: ["Comprar online per animar-te.", "Passar hores a les xarxes socials per evadir-te.", "Parlar amb un amic o fer una passejada."], answer: 2 },
                { q: "Veus una oferta 'imperdible' a internet d'alguna cosa que no necessites. Què fas?", options: ["La compro immediatament abans que s'acabi.", "M'ho penso durant 24 hores abans de decidir.", "Miro si puc demanar un crèdit ràpid per aprofitar-la."], answer: 1 },
            ]
        }
    },
    'm03p02': {
        title: '2. El teu consell d\'or',
        subtitle: 'Comparteix la teva experiència de forma anònima.',
        status: 'locked',
        progress: 0,
        activity: {
            type: 'reflection-journal',
            prompt: 'Comparteix un consell o una experiència personal breu (de forma totalment anònima) sobre com gestiones una distracció digital (xarxes socials, compres, videojocs...). La teva aportació pot ajudar altres companys.',
            points: 150,
        }
    }
};