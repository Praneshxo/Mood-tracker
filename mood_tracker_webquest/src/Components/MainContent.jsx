import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { LightbulbIcon, BarChart3, Brain, Loader } from 'lucide-react';

const MainContent = () => {
  const [moodInput, setMoodInput] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const moodFormRef = useRef(null);
  const featuresRef = useRef(null);

  useEffect(() => {
    gsap.from(moodFormRef.current, {
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 1,
      ease: "power3.out",
    });

    gsap.from(".feature-card", {
      y: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      delay: 1.5,
    });
  }, []);

  const analyzeMood = async (e) => {
    e.preventDefault();
    if (!moodInput.trim()) {
      setError('Please enter your mood or thoughts');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful mental health assistant." },
            { role: "user", content: moodInput }
          ],
          max_tokens: 150
        })
      });

      if (!response.ok) throw new Error('Failed to analyze mood');

      const data = await response.json();
      setAnalysis(data.choices[0].message.content);
    } catch {
      setError('Failed to analyze mood. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-16">
      {/* Mood Input Section */}
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg" ref={moodFormRef}>
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">How are you feeling today?</h2>
        <form onSubmit={analyzeMood} className="space-y-4">
          <textarea
            value={moodInput}
            onChange={(e) => setMoodInput(e.target.value)}
            placeholder="Share your thoughts and feelings..."
            className="w-full h-32 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 resize-none"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 flex items-center justify-center"
          >
            {isLoading ? <><Loader className="animate-spin mr-2" size={20} /> Analyzing...</> : 'Analyze My Mood'}
          </button>
        </form>
        {analysis && (
          <div className="mt-6 p-4 bg-purple-50 rounded-lg">
            <h3 className="font-semibold text-purple-900 mb-2">Analysis & Suggestions:</h3>
            <p className="text-gray-700">{analysis}</p>
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 mt-16" ref={featuresRef}>
        {[
          { Icon: BarChart3, title: "Daily Mood Tracking", desc: "Log emotions and track patterns over time." },
          { Icon: LightbulbIcon, title: "Personalized Insights", desc: "Get tailored recommendations." },
          { Icon: Brain, title: "Mental Wellness Tools", desc: "Access meditations, journaling prompts, and exercises." }
        ].map(({ Icon, title, desc }, idx) => (
          <div key={idx} className="feature-card bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl">
            <div className="bg-purple-100 p-3 rounded-lg w-fit mb-4">
              <Icon className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default MainContent;
