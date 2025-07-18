'use client'
import React, { useState } from 'react';
import {Mail,Send,Check,Loader2} from 'lucide-react';
import axios from 'axios';


const SmartEmailAssistant = () => {
  const [content, setContent] = useState('');
  const [tone, setTone] = useState('');
  const [keywords,setKeywords]=useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const tones = [
    { value: 'professional', label: 'Professional' },
    { value: 'friendly', label: 'Friendly' },
    { value: 'formal', label: 'Formal' },
    { value: 'casual', label: 'Casual' },
    { value: 'persuasive', label: 'Persuasive' },
    { value: 'apologetic', label: 'Apologetic' },
    { value: 'enthusiastic', label: 'Enthusiastic' },
    { value: 'concise', label: 'Concise' }
  ];

const handleSubmit=async(e)=>{
      e.preventDefault();

      setIsLoading(true);
      setGeneratedReply('');
      try
      {
           // URL,BODY,HEADERS
            const response=await axios.post(`${SERVER_URI}`,
                {
                  content,
                  tone
                },
                {headers:{"Content-Type":"application/json"},
            });
            console.log("Response json:",response.json);
            console.log("Response status:",response.status);
            console.log("Response ",response.data);
            setGeneratedReply(response.data);

      }
      catch(e)
      {
        console.log("Error while fetching server:",e);
      }
      finally
      {
           setIsLoading(false);
      }
}

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-blue-600 rounded-lg">
              <Mail className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
            Smart Email Assistant
          </h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto">
            Enhance your emails with AI-powered tone adjustment and professional formatting
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Compose Email
            </h2>

            <form className="space-y-6" onSubmit={(e)=>handleSubmit(e)}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Content</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter your email content here..."
                  className="w-full h-40 px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Keywords for reply</label>
                <input
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.keywords)}
                  placeholder="Enter keyowrds for what kinf of response u want.."
                  className="w-full h-10 px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  required
                />
              </div>

              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tone</label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full px-4 py-3 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select a tone</option>
                  {tones.map((tone) => (
                    <option key={tone.value} value={tone.value}>{tone.label}</option>
                  ))}
                </select>
              </div>

              <button
                type='submit'
                disabled={isLoading}
                className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                    <Send className="w-5 h-5 mr-2" />
                    Generate Email
              </button>
            </form>
          </div>

      
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Generated Email</h2>

            <div className="min-h-[300px]">
              {!generatedReply && !isLoading &&(
                <div className="flex items-center justify-center h-full text-center py-12">
                  <div>
                    <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">
                      Your enhanced email will appear here
                    </p>
                  </div>
                </div>
              )}

              {isLoading && (
                <div className="flex items-center justify-center h-full text-center py-12">
                  <div>
                    <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Generating your email...</p>
                  </div>
                </div>
              )}

              
              {generatedReply && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-green-600">
                      <Check className="w-5 h-5 mr-2" />
                      <span className="font-medium">Email Generated</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 border rounded-lg p-4">
                    <div className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                      {generatedReply}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartEmailAssistant;