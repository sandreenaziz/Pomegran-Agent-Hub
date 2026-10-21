import {
  HOT_TOPICS,
  SCENARIOS,
  SOFT_SKILLS_LESSONS,
  VIDEOS,
  LOBS,
  LobId,
  HotTopic,
  Scenario,
  SoftSkillLesson,
  VideoItem,
} from '../data/content';
import { ModuleType } from '../components/LobWorkspaceView';

export interface SearchResultItem {
  id: string;
  type: 'topic' | 'scenario' | 'soft-skill' | 'video' | 'lob';
  typeLabel: string;
  title: string;
  subtitle: string;
  snippet: string;
  lobId?: LobId | 'all';
  lobName?: string;
  moduleId?: ModuleType;
  targetId?: string; // specific topicId, scenarioId, lessonId, or videoId
}

/**
 * Searches across all content in Pomegran Agent Hub (Global Search)
 */
export function searchGlobal(rawQuery: string): SearchResultItem[] {
  const query = rawQuery.trim().toLowerCase();
  if (!query) return [];

  const results: SearchResultItem[] = [];

  // 1. Search Lines of Business
  LOBS.forEach((lob) => {
    if (
      lob.name.toLowerCase().includes(query) ||
      lob.fullName.toLowerCase().includes(query) ||
      lob.description.toLowerCase().includes(query) ||
      lob.focusArea.toLowerCase().includes(query)
    ) {
      results.push({
        id: `lob-${lob.id}`,
        type: 'lob',
        typeLabel: 'Line of Business',
        title: `${lob.name} — ${lob.fullName}`,
        subtitle: lob.description,
        snippet: `Focus: ${lob.focusArea}`,
        lobId: lob.id,
        lobName: lob.name,
      });
    }
  });

  // 2. Search Hot Topics
  HOT_TOPICS.forEach((topic) => {
    const lob = LOBS.find((l) => l.id === topic.lobId);
    const inTitle = topic.title.toLowerCase().includes(query);
    const inTeaser = topic.teaser.toLowerCase().includes(query);
    const inSummary = topic.summary.toLowerCase().includes(query);
    const matchedKeyPoint = topic.keyPoints.find((kp) =>
      kp.toLowerCase().includes(query)
    );
    const matchedDo = topic.doAndDont.dos.find((d) =>
      d.toLowerCase().includes(query)
    );
    const matchedDont = topic.doAndDont.donts.find((d) =>
      d.toLowerCase().includes(query)
    );

    if (
      inTitle ||
      inTeaser ||
      inSummary ||
      matchedKeyPoint ||
      matchedDo ||
      matchedDont
    ) {
      let snippet = topic.summary;
      if (matchedKeyPoint) {
        snippet = `Key Point: ${matchedKeyPoint}`;
      } else if (matchedDo) {
        snippet = `DO: ${matchedDo}`;
      } else if (matchedDont) {
        snippet = `DON'T: ${matchedDont}`;
      } else if (inTeaser) {
        snippet = topic.teaser;
      }

      results.push({
        id: `topic-${topic.id}`,
        type: 'topic',
        typeLabel: 'Hot Topic',
        title: topic.title,
        subtitle: `${lob?.name || topic.lobId.toUpperCase()} · ${topic.readTime}`,
        snippet,
        lobId: topic.lobId,
        lobName: lob?.name,
        moduleId: 'hot-topics',
        targetId: topic.id,
      });
    }
  });

  // 3. Search Real Customer Scenarios
  SCENARIOS.forEach((scenario) => {
    const lob = LOBS.find((l) => l.id === scenario.lobId);
    const inTitle = scenario.title.toLowerCase().includes(query);
    const inCustomer = scenario.customerName.toLowerCase().includes(query);
    const inSetup = scenario.setup.toLowerCase().includes(query);
    const inTakeaway = scenario.takeaway.toLowerCase().includes(query);
    const matchedOption = scenario.firstStep.options.find(
      (opt) =>
        opt.text.toLowerCase().includes(query) ||
        opt.reason.toLowerCase().includes(query)
    );

    if (inTitle || inCustomer || inSetup || inTakeaway || matchedOption) {
      let snippet = scenario.setup;
      if (inCustomer) {
        snippet = `Customer: ${scenario.customerName} (${scenario.customerMood}) - "${scenario.setup}"`;
      } else if (matchedOption) {
        snippet = `Coaching: ${matchedOption.reason}`;
      } else if (inTakeaway) {
        snippet = `Takeaway: ${scenario.takeaway}`;
      }

      results.push({
        id: `scenario-${scenario.id}`,
        type: 'scenario',
        typeLabel: 'Scenario Simulation',
        title: scenario.title,
        subtitle: `${lob?.name || scenario.lobId.toUpperCase()} · ${scenario.customerMood} · ${scenario.channel}`,
        snippet,
        lobId: scenario.lobId,
        lobName: lob?.name,
        moduleId: 'scenarios',
        targetId: scenario.id,
      });
    }
  });

  // 4. Search Soft Skills Lessons
  SOFT_SKILLS_LESSONS.forEach((lesson) => {
    const inTitle = lesson.title.toLowerCase().includes(query);
    const inCoreIdea = lesson.coreIdea.toLowerCase().includes(query);
    const inWhy = lesson.whyItMatters.toLowerCase().includes(query);
    const inSayThis = lesson.sayThis.toLowerCase().includes(query);
    const inNotThis = lesson.notThis.toLowerCase().includes(query);
    const matchedStep = lesson.techniqueSteps.find(
      (s) =>
        s.title.toLowerCase().includes(query) ||
        s.description.toLowerCase().includes(query)
    );

    if (inTitle || inCoreIdea || inWhy || inSayThis || inNotThis || matchedStep) {
      let snippet = lesson.coreIdea;
      if (inSayThis) {
        snippet = `Say this: "${lesson.sayThis}"`;
      } else if (inNotThis) {
        snippet = `Not this: "${lesson.notThis}"`;
      } else if (matchedStep) {
        snippet = `Step: ${matchedStep.title} — ${matchedStep.description}`;
      } else if (inWhy) {
        snippet = lesson.whyItMatters;
      }

      results.push({
        id: `soft-${lesson.id}`,
        type: 'soft-skill',
        typeLabel: 'Soft Skills Lesson',
        title: lesson.title,
        subtitle: `Core People Skill · ${lesson.readTime}`,
        snippet,
        lobId: undefined, // Universal to all LOBs
        lobName: 'All Teams',
        moduleId: 'soft-skills',
        targetId: lesson.id,
      });
    }
  });

  // 5. Search Microlearning Videos
  VIDEOS.forEach((video) => {
    const lob = LOBS.find((l) => l.id === video.lobId);
    const inTitle = video.title.toLowerCase().includes(query);
    const inDesc = video.description.toLowerCase().includes(query);
    const inSpeaker = video.speaker.toLowerCase().includes(query);
    const matchedTag = video.tags.find((t) => t.toLowerCase().includes(query));
    const matchedTakeaway = video.keyTakeaways.find((tk) =>
      tk.toLowerCase().includes(query)
    );

    if (inTitle || inDesc || inSpeaker || matchedTag || matchedTakeaway) {
      let snippet = video.description;
      if (matchedTakeaway) {
        snippet = `Takeaway: ${matchedTakeaway}`;
      } else if (matchedTag) {
        snippet = `Tag #${matchedTag}: ${video.description}`;
      }

      results.push({
        id: `video-${video.id}`,
        type: 'video',
        typeLabel: 'Microlearning Video',
        title: video.title,
        subtitle: `${video.lobId === 'all' ? 'All Teams' : lob?.name || ''} · ${video.duration} · ${video.speaker}`,
        snippet,
        lobId: video.lobId === 'all' ? undefined : video.lobId,
        lobName: video.lobId === 'all' ? 'All Teams' : lob?.name,
        moduleId: 'videos',
        targetId: video.id,
      });
    }
  });

  return results;
}

/**
 * Searches exclusively within a specific Line of Business workspace & its topics/scenarios/videos/lessons
 */
export function searchLob(lobId: LobId, rawQuery: string): SearchResultItem[] {
  const query = rawQuery.trim().toLowerCase();
  if (!query) return [];

  const results: SearchResultItem[] = [];
  const currentLobConfig = LOBS.find((l) => l.id === lobId);

  // 1. Hot Topics belonging to this LOB
  const lobTopics = HOT_TOPICS.filter((t) => t.lobId === lobId);
  lobTopics.forEach((topic) => {
    const inTitle = topic.title.toLowerCase().includes(query);
    const inTeaser = topic.teaser.toLowerCase().includes(query);
    const inSummary = topic.summary.toLowerCase().includes(query);
    const matchedKeyPoint = topic.keyPoints.find((kp) =>
      kp.toLowerCase().includes(query)
    );
    const matchedDo = topic.doAndDont.dos.find((d) =>
      d.toLowerCase().includes(query)
    );
    const matchedDont = topic.doAndDont.donts.find((d) =>
      d.toLowerCase().includes(query)
    );

    if (
      inTitle ||
      inTeaser ||
      inSummary ||
      matchedKeyPoint ||
      matchedDo ||
      matchedDont
    ) {
      let snippet = topic.summary;
      if (matchedKeyPoint) {
        snippet = `Key Point: ${matchedKeyPoint}`;
      } else if (matchedDo) {
        snippet = `DO: ${matchedDo}`;
      } else if (matchedDont) {
        snippet = `DON'T: ${matchedDont}`;
      } else if (inTeaser) {
        snippet = topic.teaser;
      }

      results.push({
        id: `topic-${topic.id}`,
        type: 'topic',
        typeLabel: 'Hot Topic Policy',
        title: topic.title,
        subtitle: `${currentLobConfig?.name} · ${topic.readTime}`,
        snippet,
        lobId,
        lobName: currentLobConfig?.name,
        moduleId: 'hot-topics',
        targetId: topic.id,
      });
    }
  });

  // 2. Real Customer Scenarios belonging to this LOB
  const lobScenarios = SCENARIOS.filter((s) => s.lobId === lobId);
  lobScenarios.forEach((scenario) => {
    const inTitle = scenario.title.toLowerCase().includes(query);
    const inCustomer = scenario.customerName.toLowerCase().includes(query);
    const inSetup = scenario.setup.toLowerCase().includes(query);
    const inTakeaway = scenario.takeaway.toLowerCase().includes(query);
    const matchedOption = scenario.firstStep.options.find(
      (opt) =>
        opt.text.toLowerCase().includes(query) ||
        opt.reason.toLowerCase().includes(query)
    );

    if (inTitle || inCustomer || inSetup || inTakeaway || matchedOption) {
      let snippet = scenario.setup;
      if (inCustomer) {
        snippet = `Customer: ${scenario.customerName} (${scenario.customerMood}) - "${scenario.setup}"`;
      } else if (matchedOption) {
        snippet = `Coaching: ${matchedOption.reason}`;
      } else if (inTakeaway) {
        snippet = `Takeaway: ${scenario.takeaway}`;
      }

      results.push({
        id: `scenario-${scenario.id}`,
        type: 'scenario',
        typeLabel: 'Interactive Scenario',
        title: scenario.title,
        subtitle: `${currentLobConfig?.name} · ${scenario.customerMood} · ${scenario.channel}`,
        snippet,
        lobId,
        lobName: currentLobConfig?.name,
        moduleId: 'scenarios',
        targetId: scenario.id,
      });
    }
  });

  // 3. Videos belonging to this LOB or All
  const lobVideos = VIDEOS.filter(
    (v) => v.lobId === lobId || v.lobId === 'all'
  );
  lobVideos.forEach((video) => {
    const inTitle = video.title.toLowerCase().includes(query);
    const inDesc = video.description.toLowerCase().includes(query);
    const inSpeaker = video.speaker.toLowerCase().includes(query);
    const matchedTag = video.tags.find((t) => t.toLowerCase().includes(query));
    const matchedTakeaway = video.keyTakeaways.find((tk) =>
      tk.toLowerCase().includes(query)
    );

    if (inTitle || inDesc || inSpeaker || matchedTag || matchedTakeaway) {
      let snippet = video.description;
      if (matchedTakeaway) {
        snippet = `Takeaway: ${matchedTakeaway}`;
      } else if (matchedTag) {
        snippet = `Tag #${matchedTag}: ${video.description}`;
      }

      results.push({
        id: `video-${video.id}`,
        type: 'video',
        typeLabel: 'Microlearning Video',
        title: video.title,
        subtitle: `${video.duration} · ${video.speaker}`,
        snippet,
        lobId,
        lobName: currentLobConfig?.name,
        moduleId: 'videos',
        targetId: video.id,
      });
    }
  });

  // 4. Soft Skills Lessons (relevant to this workspace)
  SOFT_SKILLS_LESSONS.forEach((lesson) => {
    const inTitle = lesson.title.toLowerCase().includes(query);
    const inCoreIdea = lesson.coreIdea.toLowerCase().includes(query);
    const inWhy = lesson.whyItMatters.toLowerCase().includes(query);
    const inSayThis = lesson.sayThis.toLowerCase().includes(query);
    const inNotThis = lesson.notThis.toLowerCase().includes(query);

    if (inTitle || inCoreIdea || inWhy || inSayThis || inNotThis) {
      let snippet = lesson.coreIdea;
      if (inSayThis) {
        snippet = `Say this: "${lesson.sayThis}"`;
      } else if (inNotThis) {
        snippet = `Not this: "${lesson.notThis}"`;
      }

      results.push({
        id: `soft-${lesson.id}`,
        type: 'soft-skill',
        typeLabel: 'Soft Skills Academy',
        title: lesson.title,
        subtitle: `${lesson.readTime} · People Skill`,
        snippet,
        lobId,
        lobName: currentLobConfig?.name,
        moduleId: 'soft-skills',
        targetId: lesson.id,
      });
    }
  });

  return results;
}
