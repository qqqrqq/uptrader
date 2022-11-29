

const useTimeAtWork = (time) =>{
    return{
        days:  Math.floor(time / (1000 * 60 * 60 * 24) % 30) ,
        hours: Math.floor((time / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((time / (1000 * 60)) % 60) || 1,
    }
}

export default useTimeAtWork