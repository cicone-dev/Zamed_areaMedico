import { createServer, Model } from 'miragejs'

export function makeServer({ environment = 'development' } = {}) {
  return createServer({
    environment,
    models: {
      prescription: Model,
    },
    
    routes() {
      this.namespace = 'api'
      this.timing = 800

      
      this.post('/login', (schema, request) => {
        const { crm } = JSON.parse(request.requestBody)
        return {
          token: 'fake-jwt.' + btoa(JSON.stringify({
            crm,
            name: 'Zamed',
            exp: Date.now() + 3600000
          })),
          user: { crm, name: 'Dr. Zamed' }
        }
      })

      
      this.get('/prescriptions', (schema) => {
        return schema.prescriptions.all().models.map(p => {
          const prescriptionData = {
            id: p.attrs.id.toString(), 
            patient: p.attrs.patient,
            content: p.attrs.content,
            date: p.attrs.date 
          }
          console.log('[MirageJS] Retornando prescrição:', prescriptionData)
          return prescriptionData
        })
      })

      this.get('/prescriptions/:id', (schema, request) => {
        const id = request.params.id
        const prescription = schema.prescriptions.find(id)
        
        if (!prescription) {
          return new Response(404, {}, { 
            error: `Prescrição com ID ${id} não encontrada`
          })
        }
        
        const prescriptionData = {
          id: prescription.attrs.id.toString(), 
          patient: prescription.attrs.patient,
          content: prescription.attrs.content,
          date: prescription.attrs.date 
        }
        console.log('[MirageJS] Retornando prescrição por ID:', prescriptionData)
        return prescriptionData
      })

      this.post('/prescriptions', (schema, request) => {
        const attrs = JSON.parse(request.requestBody)
        const newPrescription = schema.prescriptions.create({
          id: Date.now().toString(), 
          patient: attrs.patient?.trim() || 'Paciente não informado',
          content: attrs.content?.trim() || 'Prescrição não informada',
          date: new Date().toISOString() 
        })
        
        const prescriptionData = {
          id: newPrescription.attrs.id,
          patient: newPrescription.attrs.patient,
          content: newPrescription.attrs.content,
          date: newPrescription.attrs.date
        }
        console.log('[MirageJS] Criando nova prescrição:', prescriptionData)
        return prescriptionData
      })
    },

    seeds(server) {
      server.create('prescription', {
        id: "1",
        patient: 'João Silva',
        content: 'Paracetamol 500mg 6/6h',
        date: new Date().toISOString()
      })
    }
  })
}