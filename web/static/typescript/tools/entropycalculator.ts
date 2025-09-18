export function getEntropyValue(word: string): number {
    /**
     * Calculate the entropy of a given word.
     * Entropy is calculated using the formula:
     * H(X) = - Σ (p(x) * log2(p(x)))
     * where p(x) is the probability of character x in the word.
     * It will give a value between 1 and 5, where :
     * - 1 : very weak (e.g., "aaaaaa")
     * - 5 : very strong (e.g., "1¾÷6f%æ=Âæ:hßª©gzN")
     */
    
    if (word == null || word.trim() == "") { return 0.0; }

    // Calculate frequency of each character in the word
    const freq: Record<string, number> = {};
    for (const char of word) {
        freq[char] = (freq[char] || 0) + 1;
    }

    // Calculate probabilities
    const probabilities = Object.values(freq).map(count => count / word.length);

    // Calculate entropy
    const entropy = -probabilities.reduce((sum, p) => sum + p * Math.log2(p), 0);

    return entropy;
}

export function getEntropyTextForValue(entropyScore:number) : string {
    if(entropyScore <=0) { return "Trop faible"; }
    else if(entropyScore <=1) { return "Très faible"; }
    else if(entropyScore <=2) { return "Faible"; }
    else if(entropyScore <=3) { return "Moyen"; }
    else if(entropyScore <=4) { return "Fort"; }
    else { return "Très fort"; }
}