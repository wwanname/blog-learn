import { useState, useEffect, useRef, useCallback } from 'react';

interface UseSpeechRecognitionProps {
  onTranscript: (transcript: string) => void;
  search: boolean;
}

export default function useSpeechRecognition({ onTranscript, search }: UseSpeechRecognitionProps) {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const transcriptRef = useRef('');

  useEffect(() => {
    if (!search) return

    //register && handle event
    if ("webkitSpeechRecognition" in window) {
      const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      // the SpeechRecognition API results always be re-render when the user interact the sentences
      // onresult functions calls three times when the users interact:
      //  times                   console.log
      //  first when they start speaking: let interimTranscript = ''; let finalTranscript = '';
      //  second when they speak: interimTranscript will be updated;
      //  third when they finished (isFinal is true): that makes onresult calls again so finalTranscript will be updated then let interimTranscript = '';
      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        transcriptRef.current = finalTranscript + interimTranscript;
        onTranscript(transcriptRef.current);
      };

      recognitionRef.current.onstart = () => {
        console.log("Speech recognition started");
        setIsListening(true);
      };

      recognitionRef.current.onend = () => {
        console.log("Speech recognition ended");
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [onTranscript, search]);

  const toggleListening = useCallback(() => {
    if (!recognitionRef.current) {
      console.error("Speech recognition is not supported or initialized.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      transcriptRef.current = '';
      onTranscript('');
      recognitionRef.current.start();
    }
  }, [isListening, onTranscript]);

  return { toggleListening };
}