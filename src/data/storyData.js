export const storyData = {
  en: [
    {
      id: 1,
      character: "Narrator",
      text: "The first part of the theoretical course on the birth of the Blights has ended.\n" +
            "Some students have left their seats to get some fresh air outside, while others prefer the comfort of their chairs.\n" +
            "You are among those who stay. And so does your neighbor, apparently.",
      background: "/images/bg1.png",
      choices: null
    },
    {
      id: 2,
      character: "Narrator",
      text: "You turn slightly towards him. He seems to be rereading his notes. This guy is Isen Hata.\n" +
            "You've crossed paths with him several times on campus. He's a calm, methodical guy who's always ready to help a fellow student. He's not the type to attract attention, but he's respected for his determination.\n" +
            "But apart from that and his name, you don't know much about him.\n \n" +
            "You decide to find out a little more about him.",
      background: "/images/bg2.png",
      choices: null
    },
    {
      id: 3,
      character: "Isen",
      text: "“I come from Kitakyushu, in the south of the country. A rather quiet port city, with a lot of history and traditions, and far from the chaos of the big capitals. I grew up dreaming of new horizons but I have to admit that now, I miss it a little.”",

      background: "/images/bg2.png",
      choices: [
        { text: "Learn more about his family", next: 4 },
        { text: "Inquire about his Jinki", next: 5 }
      ]
    },
    {
      id: 4,
      character: "Isen",
      text: "“What can I say about my family?”\n\n" +
            "<i>Isen looks up at the ceiling, looking thoughtful.</i>\n\n" +
            "“My parents both work a lot to pay for my care. So, it's my uncle who mostly raised me. He's a stuntman in B-movies... a real enthusiast, a bit crazy sometimes, but it's thanks to him that I learned to be resourceful and not be afraid to take on challenges.”",
      background: "/images/bg2.png",
      choices: [
        { text: "Inquire about his Jinki", next: 5 },
        { text: "Question him about the care he receives", next: 6 }
      ]
    },
    {
      id: 5,
      character: "Isen",
      text: "“My Jinki?”\n\n" +
      "<i>He grabs a kind of metal pendant around his neck, supported by a simple string.</i>\n\n" +
      "“It's this little tuning fork. I named it <b>Dissonance</b>. Yeah, I know, it doesn't look like much compared to some students who have full-blown weapons linked to them. But thanks to it, I can sense and manipulate vibrations in addition to channeling myself. The mechanical waves produced by the vibratory effect allow me to do many things; shock waves, manipulate surface friction, weaken matter... It's pretty cool.”",
      background: "/images/bg2.png",
      choices: [
        { text: "Learn more", next: 7 },
        { text: "Ask his opinion about the academy", next: 8 }
      ]
    },
    {
      id: 6,
      character: "Isen",
      text: "“For as far back as I can remember, I've suffered from what doctors call <b>essential tremor</b>. It's a neurological disease that makes the limbs, hands, and sometimes the head shake. They appear mostly when I'm stressed or tired. It's pretty annoying but I'm medicated to reduce its effects. And I feel like my Jinki helps too.”",
      background: "/images/bg2.png",
      choices: [
        { text: "Inquire about his Jinki", next: 5 },
        { text: "Ask his opinion about the academy", next: 8 }
      ]
    },
    {
      id: 7,
      character: "Isen",
      text: "“I remember finding it on the ground when I was little. It was shining a bit in the sun and it made a little sound that attracted me. It was a strange object, but I kept it. I don't know why, but I felt it was important.”\n\n" +
      "<i>He slowly squeezes the tuning fork in the palm of his hand.</i>\n\n" +
      "“It's strange but this object has saved my life, and since that night, my tremors have calmed down. As if this tuning fork was some sort of catalyst that transforms my illness into power.”",
      background: "/images/bg2.png",
      choices: [
        { text: "Question him about his illness", next: 6 },
        { text: "Ask his opinion about the academy", next: 8 }
      ]
    },
    {
      id: 8,
      character: "Isen",
      text: "“At first, I came to Shin'en Academy with the goal of mastering my gift in the hope of healing one day, if possible. I know it's a bit selfish, but I've never aspired to become a great hunter or a hero. I don't come from a respected lineage in the field, and I don't have a tragic story related to the Blights.”\n\n" +
      "<i>He looks up towards the front of the class where the teacher is busy sorting papers.</i>\n\n" +
      "“Before I started my last year, I did two years of military service. These two years spent studying and interacting with others taught me that maybe I could make a difference too. Maybe I could help other people like me. Maybe my condition is a weapon rather than an illness; a weapon to be used for the future and to get rid of those damn creatures.”",
      background: "/images/bg2.png",
      choices: null
    },
    {
      id: 9,
      character: "Narrator",
      text: " The break is coming to an end. \n\n" +
      "Students are gradually returning to their seats in a familiar cacophony of chairs being pulled and belongings being placed back on their respective desks. \n\n" +
      "You exchange one last knowing look with Isen. A few words were enough to learn a little more about him, without lifting all the shadows. Many questions remain unanswered... but maybe you'll have the chance to talk again later. \n\n" +
      "The teacher raises his voice to announce the start of the second part of the course. You straighten up in your seat, ready to listen attentively. As if Isen's convictions had given you a new motivation for your own commitment.",
      background: "/images/bg1.png",
      choices: null
    },
  ],
  fr: [
    {
      id: 1,
      character: "Narrateur",
      text: "La première partie du cours théorique sur la naissance des Fléaux s'est terminée.\n" +
            "Certains élèves ont quitté leur place pour se rafraîchir à l'extérieur, quand d'autres préfèrent le confort de leur fauteuil.\n" +
            "Vous faites partie de ceux qui restent. Et votre voisin aussi, visiblement.",
      background: "/images/bg1.png",
      choices: null
    },
    {
      id: 2,
      character: "Narrateur",
      text: "Vous vous tournez légèrement vers lui. Il semble être en train de relire ses notes. Ce type, c'est Isen Hata.\n" + 
            "Vous l’avez déjà croisé à plusieurs occasions dans le campus. C'est un gars calme, méthodique et toujours prêt à aider un camarade. Il n’est pas trop du genre à attirer l’attention, mais il est respecté pour sa détermination.\n" +
            "Mais à part ça et son nom, vous ne connaissez pas grand chose à son propos.\n \n" +
            "Vous décidez d'en savoir un peu plus sur lui.",
      background: "/images/bg2.png",
      choices: [
        { text: "Découvrir ses origines", next: 3 },
        { text: "Se renseigner sur son Jinki", next: 5 }
      ]
    },
    {
      id: 3,
      character: "Isen",
      text: "« Je viens de Kitakyushu, dans le sud du pays. Une ville portuaire plutôt tranquille, avec beaucoup d'histoire et de traditions, et loin du chaos des grandes capitales. J'y ai grandi en rêvant de nouveaux horizons mais je dois avouer que maintenant, elle me manque un peu. »",
      background: "/images/bg2.png",
      choices: [
        { text: "En apprendre plus sur sa famille", next: 4 },
        { text: "Se renseigner sur son Jinki", next: 5 }
      ]
    },
    {
      id: 4,
      character: "Isen",
      text: "« Que dire de ma famille ? »\n\n" +
            "<i>Isen lève les yeux au plafond, l'air pensif.</i>\n\n" +
            "« Mes parents travaillent tous les deux énormément pour payer mes soins. Du coup, c’est mon oncle qui m’a élevé en grande partie. Il est cascadeur dans des séries B… un vrai passionné, un peu fou parfois, mais c’est grâce à lui que j’ai appris à être débrouillard et à ne pas avoir peur de relever des défis. »",
      background: "/images/bg2.png",
      choices: [
        { text: "Se renseigner sur son Jinki", next: 5 },
        { text: "L'interroger sur les soins qu'il reçoit", next: 6 }
      ]
    },
    {
      id: 5,
      character: "Isen",
      text: "« Mon Jinki ? »\n\n" +
      "<i>Il attrape une sorte de pendentif en métal autour de son cou, soutenu par une simple ficelle.</i>\n\n" +
      "« C'est ce petit diapason. Je l'ai baptisé <b>Dissonance</b>. Ouais je sais, il paie pas de mine par rapport à celui de certains élèves qui ont carrément des armes liées. Mais grâce à lui, je peux ressentir et manipuler les vibrations en plus de me canaliser. Les ondes mécaniques produites par l'effet vibratoire me permettent de faire plein de choses ; ondes de choc, manipuler la friction des surfaces, fragiliser la matière... C'est plutôt sympa. »",
      background: "/images/bg2.png",
      choices: [
        { text: "En apprendre davantage", next: 7 },
        { text: "Demander son avis sur l'académie", next: 8 }
      ]
    },
    {
      id: 6,
      character: "Isen",
      text: "« Depuis aussi loin que je m'en souvienne, je souffre de ce que les médecins appellent <b>tremblement essentiel</b>. C'est une maladie neurologique qui fait trembler les membres, les mains et des fois la tête. Ils apparaissent surtout quand je suis stressé ou fatigué. C'est plutôt chiant mais je suis médicamenté pour réduire ses effets. Et puis j'ai l'impression que mon Jinki aide aussi. »",
      background: "/images/bg2.png",
      choices: [
        { text: "Se renseigner sur son Jinki", next: 5 },
        { text: "Demander son avis sur l'académie", next: 8 }
      ]
    },
    {
      id: 7,
      character: "Isen",
      text: "« Je me souviens l'avoir trouvé par terre quand j'étais petit. Il brillait un peu au soleil et il faisait un petit son qui m'a attiré. C'était un objet étrange, mais je l'ai gardé. Je ne sais pas pourquoi, mais j'avais l'impression qu'il était important. »\n\n" +
      "<i>Il serre lentement le diapason dans le creux de sa main.</i>\n\n" +
      "« C'est bizarre, mais cet objet m'a sauvé la vie, et depuis cette nuit, mes tremblements se sont calmés. Comme si ce diapason était une sorte de catalyseur qui transforme ma maladie en pouvoir. »",
      background: "/images/bg2.png",
      choices: [
        { text: "L'interroger sur sa maladie", next: 6 },
        { text: "Demander son avis sur l'académie", next: 8 }
      ]
    },
    {
      id: 8,
      character: "Isen",
      text: "« À la base, je suis venu à l'académie Shin'en avec l'objectif de maîtriser mon don dans l'espoir de guérir un jour, si c'est possible. Je sais que c'est un peu égoïste, mais j'ai jamais aspiré à devenir un grand chasseur ou un héros. Je ne viens pas d'une lignée respectée dans le domaine, et je n'ai pas d'histoire tragique en rapport avec les Fléaux. »\n\n" +
      "<i>Il lève les yeux vers le devant de la classe où le professeur s'affaire à classer des papiers.</i>\n\n" +
      "« Puis avant d'entamer ma dernière année, j'ai fait deux ans de conscription militaire. Ces deux années passées à étudier et côtoyer les autres, je m'ont fait comprendre que, moi aussi, je pouvais peut-être faire une différence. Peut-être que je pourrais aider d'autres personnes comme moi. Peut-être que ma condition est une arme plutôt qu'une maladie ; une arme à utiliser pour l'avenir et nous débarasser de ces maudites bestioles. »",
      background: "/images/bg2.png",
      choices: null
    },
    {
      id: 9,
      character: "Narrateur",
      text: " La pause touche à sa fin. \n\n" +
      "Les élèves regagnent peu à peu leurs places dans une cacophonie familière de chaises tirées et d’affaires reposées sur leurs pupitres respectifs. \n\n" +
      "Vous échangez un dernier regard complice avec Isen. Quelques mots ont suffi pour en apprendre un peu plus sur lui, sans pour autant lever toutes les zones d’ombre. Beaucoup de questions restent en suspens… mais peut-être aurez-vous l’occasion de discuter à nouveau plus tard. \n\n" +
      "Le professeur lève la voix pour annoncer le début de la seconde partie du cours. Vous vous redressez dans votre siège, prêt à écouter attentivement. Comme si les convictions d’Isen vous avaient insufflé une nouvelle motivation à votre propre engagement.",
      background: "/images/bg1.png",
      choices: null
    }
  ]
};