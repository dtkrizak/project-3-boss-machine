const checkMillionDollarIdea = (idea) => {
    if(idea.numWeeks && idea.weeklyRevenue){
        const revenue = idea.numWeeks * idea.weeklyRevenue;
        if(revenue > 1000000){
            return true;
        } else {
            return false;
        }
    } else {
        return null;
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
