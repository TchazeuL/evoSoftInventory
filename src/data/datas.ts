const produits = [
    {
        "id": "prod001",
        "nom": "maillot xl Bayern FC",
        "prix": "15000"
    },
    {
        "id": "prod002",
        "nom": "maillot xl Manchester City",
        "prix": "15000"
    },
    {
        "id": "prod003",
        "nom": "maillot xl Real Madrid",
        "prix": "15000"
    },
    {
        "id": "prod004",
        "nom": "maillot xl Manchester United",
        "prix": "12000"
    },
    {
        "id": "prod005",
        "nom": "maillot xl Paris Saint-Germain",
        "prix": "12000"
    },
    {
        "id": "prod006",
        "nom": "Air force nike",
        "prix": "10000"
    },
    {
        "id": "prod007",
        "nom": "Air jordan nike",
        "prix": "12000"
    },
];

const magasins = [
    {
        "id": "mag001",
        "nom": "foot store Bonapriso",
        "adresse": "Rue Njo-Njo",
    },
    {
        "id": "mag002",
        "nom": "foot store Essos",
        "adresse": "Monté Packita",
    },
    {
        "id": "mag003",
        "nom": "foot store Akwa",
        "adresse": "Rue Soudanaise",
    },
];

// Si on suppose qu'il existe une relation many to manay entre produit et magasin

const produit_magasin = [
    {
        "produitId": "prod001",
        "magasinId": "mag001"
    },
    {
        "produitId": "prod002",
        "magasinId": "mag001"
    },
    {
        "produitId": "prod003",
        "magasinId": "mag001"
    },
    {
        "produitId": "prod002",
        "magasinId": "mag002"
    },
    {
        "produitId": "prod003",
        "magasinId": "mag002"
    },
    {
        "produitId": "prod006",
        "magasinId": "mag002"
    },
    {
        "produitId": "prod007",
        "magasinId": "mag002"
    },
    {
        "produitId": "prod001",
        "magasinId": "mag003"
    },
    {
        "produitId": "prod004",
        "magasinId": "mag003"
    },
    {
        "produitId": "prod005",
        "magasinId": "mag003"
    },
    {
        "produitId": "prod006",
        "magasinId": "mag003"
    },
    {
        "produitId": "prod007",
        "magasinId": "mag003"
    }
];

export { produits, magasins, produit_magasin }