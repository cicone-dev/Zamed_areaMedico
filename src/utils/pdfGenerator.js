import QRCode from 'qrcode'
import pdfMake from 'pdfmake/build/pdfmake.min.js'
import * as pdfFonts from 'pdfmake/build/vfs_fonts'

pdfMake.vfs = pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : pdfFonts.vfs
pdfMake.fonts = {
  Roboto: {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Medium.ttf',
    italics: 'Roboto-Italic.ttf',
    bolditalics: 'Roboto-MediumItalic.ttf'
  }
}

const validatePrescription = (prescription) => {
  const requiredFields = {
    id: 'string',
    patient: 'string',
    content: 'string',
    date: 'string'
  }

  const validationErrors = []
  for (const [field, type] of Object.entries(requiredFields)) {
    if (!(field in prescription) || typeof prescription[field] !== type) {
      validationErrors.push(`${field} (esperado ${type}, recebido ${typeof prescription[field]})`)
    }
  }

  if (validationErrors.length > 0) {
    throw new Error(`Dados inválidos para PDF. Problemas em: ${validationErrors.join(', ')}`)
  }
}

export const generatePrescription = async (prescription, doctor) => {
  try {
    console.log('[PDF] Validando prescrição...')
    validatePrescription(prescription)

    console.log('[PDF] Gerando QR Code...')
    const qrValue = `${window.location.origin}/verify/${prescription.id}`
    const qrDataURL = await QRCode.toDataURL(qrValue, {
      width: 200,
      errorCorrectionLevel: 'H'
    })

    const docDefinition = {
      content: [
        { text: '🏥 RECEITA MÉDICA DIGITAL', style: 'header' },
        { text: `🆔 ID: ${prescription.id}` },
        { text: `📅 Data: ${new Date(prescription.date).toLocaleDateString('pt-BR')}` },
        { text: `👤 Paciente: ${prescription.patient}` },
        { text: `👨⚕️ Médico: ${doctor.name} - CRM ${doctor.crm}` },
        { text: '💊 Prescrição Médica:', style: 'subheader' },
        { text: prescription.content },
        { 
          image: qrDataURL,
          width: 100,
          margin: [0, 20],
          alignment: 'center'
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
          alignment: 'center',
          color: '#1976d2'
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 5],
          color: '#2e7d32'
        }
      },
      defaultStyle: {
        font: 'Roboto' 
      }
    }

    console.log('[PDF] Criando documento...')
    pdfMake.createPdf(docDefinition).download(`receita-${prescription.id}.pdf`)
    console.log('[PDF] Download iniciado')

  } catch (error) {
    console.error('[PDF] Erro na geração:', error)
    throw new Error(`Falha ao gerar PDF: ${error.message}`)
  }
}