// Imports the Google Cloud client library
import speech from '@google-cloud/speech'

// Creates a client
const client = new speech.SpeechClient()


export async function recognize (audioFile: Buffer | NonSharedBuffer) {
	const encoding = 'WEBM_OPUS' as const
	const sampleRateHertz = 48000
	const languageCode = 'en-US'
	const alternativeLanguageCodes = ['id-ID']

	const config = {
		encoding,
		sampleRateHertz,
		languageCode,
		alternativeLanguageCodes,
	}

	const audio = {
		content: audioFile.toString('base64'),
	}

	const request = {
		config: config,
		audio: audio,
	}

	// Detects speech in the audio file
	const [response] = await client.recognize(request)
	const transcription = response.results
	  ?.map(result => result.alternatives ? result.alternatives[0].transcript : '')
	  .join('\n')

	console.log('Transcription: ', transcription)
	return transcription
	// console.log(response)
}

