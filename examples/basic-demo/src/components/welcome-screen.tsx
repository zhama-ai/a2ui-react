import { Sparkles } from 'lucide-react';

export function WelcomeScreen() {
  return (
    <div className="flex h-full items-center justify-center p-8">
      <div className="max-w-2xl text-center">
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Sparkles className="h-8 w-8 text-primary" />
        </div>

        <h1 className="mb-4 text-4xl font-bold tracking-tight">Welcome to A2UI Basic Demo</h1>

        <p className="mb-8 text-lg text-muted-foreground">
          This demo showcases the Agent-to-UI (A2UI) protocol. Send a message in the chat panel to
          see how AI agents can generate dynamic, interactive user interfaces.
        </p>

        <div className="space-y-4 rounded-lg border bg-card p-6 text-left">
          <h3 className="font-semibold">Try these messages:</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• "Hello" - Get a welcome card</li>
            <li>• "Show me items" - See a list of cards</li>
            <li>• "Form" - Get an interactive form</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
