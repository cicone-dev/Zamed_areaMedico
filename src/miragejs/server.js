import { createServer, Model, Response } from 'miragejs'

export function makeServer({ environment = 'development' } = {}) {
  return createServer({
    environment,
    models: {
      prescription: Model,
    },
    
    routes() {
      this.namespace = 'api'
      this.timing = 800

      // ==============================
      // 🔹 CONSULTAS (fake)
      // ==============================
      this.get('/consultas', () => {
        return [
          {
            id: '1',
            paciente: 'Gian Luccas',
            cpf: '123.456.789-00',
            email: 'giannzz@gmail.com',
            data: '2025-09-09',
            hora: '14:30',
            situacao: 'Médio'
          },
          {
            id: '2',
            paciente: 'Jonathan Calleri',
            cpf: '987.654.321-00',
            email: 'calleri.sp@example.com',
            data: '2025-09-10',
            hora: '09:00',
            situacao: 'Bem'
          },
          {
            id: '3',
            paciente: 'Roberto Carlos',
            cpf: '123.456.789-00',
            email: 'r9.carlos@example.com',
            data: '2025-09-11',
            hora: '15:00',
            situacao: 'Sério'
          }
        ]
      })

      this.post('/consultas', (schema, request) => {
        const attrs = JSON.parse(request.requestBody)

        // só devolve o que recebeu + id fake
        return {
          id: Date.now().toString(),
          paciente: attrs.paciente || 'Paciente não informado',
          cpf: attrs.cpf || '000.000.000-00',
          email: attrs.email || 'sem-email@example.com',
          data: attrs.data,
          hora: attrs.hora,
          motivo: attrs.motivo || 'Sem motivo informado',
          situacao: attrs.situacao || 'Pendente'
        }
      })

      // ==============================
      // 🔹 LOGIN FAKE
      // ==============================
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

      // ==============================
      // 🔹 PRESCRIÇÕES
      // ==============================
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
      // 🔹 seeds de prescriptions
      server.create('prescription', {
        id: "1",
        patient: 'João Carlos',
        content: 'Paracetamol 500mg 6/6h',
        date: new Date().toISOString()
      })

      server.create('prescription', {
        id: "2",
        patient: 'Mariana Garrido',
        content: 'Dipirona 500mg 6/6h',
        date: new Date().toISOString()
      })

      server.create('prescription', {
        id: "3",
        patient: 'Roberto Carlos',
        content: 'Paracetamol 500mg 6/6h',
        date: new Date().toISOString()
      })
    }
  })
}
