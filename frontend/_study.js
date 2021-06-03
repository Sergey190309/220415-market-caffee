const payload = [
  {
      view_id: 'admin',
      attributes: {},
      view: {
          view_id: 'admin',
          description: 'Views that available to logged admins only.'
      },
      user_id: 0,
      updated: null,
      created: '2021-06-01T10:12:16'
  },
  {
      view_id: 'landing',
      attributes: {
          '00': {
              name: 'header',
              type: 'header'
          },
          '01': {
              qnt: 3,
              name: 'vblock00',
              type: 'vblock',
              subtype: 'txt'
          },
          '02': {
              qnt: 2,
              name: 'hblock00',
              type: 'hblock',
              subtype: 'pix'
          },
          '03': {
              qnt: 2,
              name: 'vblock01',
              type: 'vblock',
              subtype: 'pix'
          },
          '04': {
              name: 'footer',
              type: 'footer'
          }
      },
      view: {
          view_id: 'landing',
          description: 'That is root view where customers come from searching engines.'
      },
      user_id: 0,
      updated: null,
      created: '2021-06-01T10:12:16'
  },
  {
      view_id: 'pictures',
      attributes: {},
      view: {
          view_id: 'pictures',
          description: 'Some pictures with our kind interiors.'
      },
      user_id: 0,
      updated: null,
      created: '2021-06-01T10:12:16'
  },
  {
      view_id: 'price_list',
      attributes: {},
      view: {
          view_id: 'price_list',
          description: 'The view with price to our services.'
      },
      user_id: 0,
      updated: null,
      created: '2021-06-01T10:12:16'
  },
  {
      view_id: 'private',
      attributes: {},
      view: {
          view_id: 'private',
          description: 'View that available to logged users only.'
      },
      user_id: 0,
      updated: null,
      created: '2021-06-01T10:12:16'
  }
]

const result00 = payload.map(item => {
  return {[item['view_id']]: item['attributes']}
})


console.log('array ->', result00)

let state = {}

result00.map(item => {
    state = { ...state, ...item }
    return state
})

console.log('state ->', state)
