const  payload = [
    {
      "remarks": "General english.",
      "id": "en"
    },
    {
      "remarks": "Общий русский.",
      "id": "ru"
    }
]

const result = payload.map((item) => item.id)

console.log(result)