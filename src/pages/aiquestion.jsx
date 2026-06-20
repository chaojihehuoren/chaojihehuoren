// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';

import { TestIntro } from '@/components/TestIntro';
import { TestProgress } from '@/components/TestProgress';
import { TestQuestion } from '@/components/TestQuestion';
import { TestResult } from '@/components/TestResult';
// 简化的问卷题目（缩减60%，从60题减至24题）
const QUESTIONS = [{
  id: 1,
  text: '您是否容易疲乏、气短，呼吸急促？',
  tip: '请根据近三个月的感受作答',
  options: [{
    label: '没有',
    value: 1
  }, {
    label: '偶尔',
    value: 2
  }, {
    label: '有时',
    value: 3
  }, {
    label: '经常',
    value: 4
  }, {
    label: '总是',
    value: 5
  }]
}, {
  id: 2,
  text: '您是否容易畏寒、手脚冰凉？',
  options: [{
    label: '没有',
    value: 1
  }, {
    label: '偶尔',
    value: 2
  }, {
    label: '有时',
    value: 3
  }, {
    label: '经常',
    value: 4
  }, {
    label: '总是',
    value: 5
  }]
}, {
  id: 3,
  text: '您是否容易口干舌燥、咽喉干痛？',
  options: [{
    label: '没有',
    value: 1
  }, {
    label: '偶尔',
    value: 2
  }, {
    label: '有时',
    value: 3
  }, {
    label: '经常',
    value: 4
  }, {
    label: '总是',
    value: 5
  }]
}, {
  id: 4,
  text: '您的体形是否偏胖，腹部肥满松软？',
  options: [{
    label: '绝对不是',
    value: 1
  }, {
    label: '不太像',
    value: 2
  }, {
    label: '有些像',
    value: 3
  }, {
    label: '比较像',
    value: 4
  }, {
    label: '完全符合',
    value: 5
  }]
}, {
  id: 5,
  text: '您面部或皮肤是否容易出油、长痘？',
  options: [{
    label: '没有',
    value: 1
  }, {
    label: '偶尔',
    value: 2
  }, {
    label: '有时',
    value: 3
  }, {
    label: '经常',
    value: 4
  }, {
    label: '总是',
    value: 5
  }]
}, {
  id: 6,
  text: '您是否容易出现疼痛症状，如头痛、胸痛等？',
  options: [{
    label: '没有',
    value: 1
  }, {
    label: '偶尔',
    value: 2
  }, {
    label: '有时',
    value: 3
  }, {
    label: '经常',
    value: 4
  }, {
    label: '总是',
    value: 5
  }]
}, {
  id: 7,
  text: '您是否容易情绪低落、焦虑不安？',
  options: [{
    label: '没有',
    value: 1
  }, {
    label: '偶尔',
    value: 2
  }, {
    label: '有时',
    value: 3
  }, {
    label: '经常',
    value: 4
  }, {
    label: '总是',
    value: 5
  }]
}, {
  id: 8,
  text: '您是否对某些食物、药物或花粉过敏？',
  options: [{
    label: '没有',
    value: 1
  }, {
    label: '有，但不严重',
    value: 2
  }, {
    label: '有时过敏',
    value: 3
  }, {
    label: '经常过敏',
    value: 4
  }, {
    label: '严重过敏',
    value: 5
  }]
}, {
  id: 9,
  text: '您的面色是否红润有光泽？',
  options: [{
    label: '非常红润',
    value: 1
  }, {
    label: '比较红润',
    value: 2
  }, {
    label: '一般',
    value: 3
  }, {
    label: '偏暗淡',
    value: 4
  }, {
    label: '非常暗淡',
    value: 5
  }]
}, {
  id: 10,
  text: '您说话的声音是否低弱无力？',
  options: [{
    label: '声音洪亮',
    value: 1
  }, {
    label: '声音正常',
    value: 2
  }, {
    label: '声音偏低',
    value: 3
  }, {
    label: '声音低弱',
    value: 4
  }, {
    label: '声音极弱',
    value: 5
  }]
}, {
  id: 11,
  text: '您是否喜欢喝热饮，不喜冷食？',
  options: [{
    label: '非常喜欢',
    value: 1
  }, {
    label: '比较喜欢',
    value: 2
  }, {
    label: '无所谓',
    value: 3
  }, {
    label: '不太喜欢',
    value: 4
  }, {
    label: '讨厌',
    value: 5
  }]
}, {
  id: 12,
  text: '您的手心、脚心是否容易发热？',
  options: [{
    label: '没有',
    value: 1
  }, {
    label: '偶尔',
    value: 2
  }, {
    label: '有时',
    value: 3
  }, {
    label: '经常',
    value: 4
  }, {
    label: '总是',
    value: 5
  }]
}, {
  id: 13,
  text: '您的大便是否粘滞不畅、容易便秘？',
  options: [{
    label: '大便正常',
    value: 1
  }, {
    label: '偶尔异常',
    value: 2
  }, {
    label: '有时粘滞',
    value: 3
  }, {
    label: '经常便秘',
    value: 4
  }, {
    label: '总是异常',
    value: 5
  }]
}, {
  id: 14,
  text: '您的舌苔是否厚腻、发黄？',
  options: [{
    label: '舌苔薄白',
    value: 1
  }, {
    label: '舌苔正常',
    value: 2
  }, {
    label: '舌苔偏厚',
    value: 3
  }, {
    label: '舌苔厚腻',
    value: 4
  }, {
    label: '舌苔黄腻',
    value: 5
  }]
}, {
  id: 15,
  text: '您的皮肤是否容易出现瘀斑、紫癜？',
  options: [{
    label: '没有',
    value: 1
  }, {
    label: '偶尔',
    value: 2
  }, {
    label: '有时',
    value: 3
  }, {
    label: '经常',
    value: 4
  }, {
    label: '总是',
    value: 5
  }]
}, {
  id: 16,
  text: '您是否容易心慌、健忘、失眠？',
  options: [{
    label: '没有',
    value: 1
  }, {
    label: '偶尔',
    value: 2
  }, {
    label: '有时',
    value: 3
  }, {
    label: '经常',
    value: 4
  }, {
    label: '总是',
    value: 5
  }]
}, {
  id: 17,
  text: '您的身体是否对外界环境变化敏感？',
  options: [{
    label: '完全不敏感',
    value: 1
  }, {
    label: '不太敏感',
    value: 2
  }, {
    label: '一般',
    value: 3
  }, {
    label: '比较敏感',
    value: 4
  }, {
    label: '非常敏感',
    value: 5
  }]
}, {
  id: 18,
  text: '您的精力是否充沛，不容易疲劳？',
  options: [{
    label: '非常充沛',
    value: 1
  }, {
    label: '比较充沛',
    value: 2
  }, {
    label: '一般',
    value: 3
  }, {
    label: '容易疲劳',
    value: 4
  }, {
    label: '非常疲劳',
    value: 5
  }]
}, {
  id: 19,
  text: '您是否耐受寒冷（冬天不怕冷）？',
  options: [{
    label: '非常耐受',
    value: 1
  }, {
    label: '比较耐受',
    value: 2
  }, {
    label: '一般',
    value: 3
  }, {
    label: '不太耐受',
    value: 4
  }, {
    label: '非常怕冷',
    value: 5
  }]
}, {
  id: 20,
  text: '您是否耐受高温（夏天不怕热）？',
  options: [{
    label: '非常耐受',
    value: 1
  }, {
    label: '比较耐受',
    value: 2
  }, {
    label: '一般',
    value: 3
  }, {
    label: '不太耐受',
    value: 4
  }, {
    label: '非常怕热',
    value: 5
  }]
}, {
  id: 21,
  text: '您的睡眠质量如何？',
  options: [{
    label: '非常好',
    value: 1
  }, {
    label: '比较好',
    value: 2
  }, {
    label: '一般',
    value: 3
  }, {
    label: '不太好',
    value: 4
  }, {
    label: '非常差',
    value: 5
  }]
}, {
  id: 22,
  text: '您是否容易自汗（不动也出汗）？',
  options: [{
    label: '没有',
    value: 1
  }, {
    label: '偶尔',
    value: 2
  }, {
    label: '有时',
    value: 3
  }, {
    label: '经常',
    value: 4
  }, {
    label: '总是',
    value: 5
  }]
}, {
  id: 23,
  text: '您的性格是否开朗乐观？',
  options: [{
    label: '非常开朗',
    value: 1
  }, {
    label: '比较开朗',
    value: 2
  }, {
    label: '一般',
    value: 3
  }, {
    label: '比较内向',
    value: 4
  }, {
    label: '非常内向',
    value: 5
  }]
}, {
  id: 24,
  text: '您的适应能力如何（对新环境）？',
  options: [{
    label: '适应很快',
    value: 1
  }, {
    label: '适应较快',
    value: 2
  }, {
    label: '一般',
    value: 3
  }, {
    label: '适应较慢',
    value: 4
  }, {
    label: '很难适应',
    value: 5
  }]
}];

// 九种体质类型
const CONSTITUTIONS = [{
  name: '平和质',
  key: 'pinghe'
}, {
  name: '气虚质',
  key: 'qixu'
}, {
  name: '阳虚质',
  key: 'yangxu'
}, {
  name: '阴虚质',
  key: 'yinxu'
}, {
  name: '痰湿质',
  key: 'tanshi'
}, {
  name: '湿热质',
  key: 'shire'
}, {
  name: '血瘀质',
  key: 'xueyu'
}, {
  name: '气郁质',
  key: 'qiyu'
}, {
  name: '特禀质',
  key: 'tebing'
}];

// 根据答案计算体质得分
function calculateScores(answers) {
  const scores = {
    '平和质': 0,
    '气虚质': 0,
    '阳虚质': 0,
    '阴虚质': 0,
    '痰湿质': 0,
    '湿热质': 0,
    '血瘀质': 0,
    '气郁质': 0,
    '特禀质': 0
  };

  // 题目映射到体质类型
  const mapping = {
    1: '气虚质',
    // 疲乏
    2: '阳虚质',
    // 畏寒
    3: '阴虚质',
    // 口干
    4: '痰湿质',
    // 偏胖
    5: '湿热质',
    // 出油
    6: '血瘀质',
    // 疼痛
    7: '气郁质',
    // 情绪
    8: '特禀质',
    // 过敏
    9: '平和质',
    // 面色
    10: '气虚质',
    // 声音
    11: '阳虚质',
    // 热饮
    12: '阴虚质',
    // 手脚热
    13: '痰湿质',
    // 大便
    14: '湿热质',
    // 舌苔
    15: '血瘀质',
    // 瘀斑
    16: '气郁质',
    // 心慌
    17: '特禀质',
    // 敏感
    18: '平和质',
    // 精力
    19: '阳虚质',
    // 耐寒
    20: '阴虚质',
    // 耐热
    21: '平和质',
    // 睡眠
    22: '气虚质',
    // 自汗
    23: '平和质',
    // 性格
    24: '平和质' // 适应
  };

  // 计算每种体质的得分
  Object.entries(answers).forEach(([questionId, value]) => {
    const constitution = mapping[parseInt(questionId)];
    if (constitution && scores[constitution] !== undefined) {
      scores[constitution] += value;
    }
  });

  // 转换为百分制
  Object.keys(scores).forEach(key => {
    scores[key] = scores[key] / (QUESTIONS.length * 5) * 100;
  });
  return scores;
}

// 获取主要体质
function getMainConstitution(scores) {
  let maxScore = 0;
  let mainType = '平和质';
  Object.entries(scores).forEach(([type, score]) => {
    if (score > maxScore) {
      maxScore = score;
      mainType = type;
    }
  });

  // 如果平和质分数太高，则为平和质
  if (mainType !== '平和质' && scores['平和质'] > 60) {
    return '平和质';
  }
  return mainType;
}

// 生成养生建议
function getRecommendations(mainType) {
  const recommendations = {
    '平和质': ['继续保持均衡饮食，荤素搭配', '适度运动，每周至少3次有氧运动', '规律作息，早睡早起', '保持乐观心态', '定期体检，关注健康'],
    '气虚质': ['多吃补气食物：如山药、黄芪、党参等', '避免过度劳累和剧烈运动', '适当散步、打太极等温和运动', '保证充足睡眠，避免熬夜', '少说话多休息，避免耗气'],
    '阳虚质': ['多吃温补食物：如羊肉、核桃、桂圆等', '少吃寒凉食物，如冰品、西瓜等', '注意保暖，特别是腰腹和脚部', '适度晒太阳，补充阳气', '泡脚驱寒，促进血液循环'],
    '阴虚质': ['多吃滋阴食物：如银耳、百合、梨等', '少吃辛辣刺激性食物', '保持充足睡眠，避免熬夜', '多喝水，补充体内津液', '避免情绪激动，保持平静'],
    '痰湿质': ['清淡饮食，少油少盐', '多吃利湿食物：如薏米、冬瓜、赤小豆', '适度运动，帮助排湿', '避免甜腻、生冷食物', '规律作息，避免久坐'],
    '湿热质': ['清淡饮食，多吃蔬果', '少吃辛辣、油腻、甜食', '多喝温水或清热茶饮', '保持居住环境干燥通风', '适度运动排汗，注意清洁'],
    '血瘀质': ['多吃活血食物：如山楂、黑木耳、洋葱等', '少吃油腻、寒凉食物', '适度运动，促进血液循环', '保持情绪舒畅，避免气滞', '注意保暖，避免受寒'],
    '气郁质': ['多吃疏肝理气食物：如玫瑰花、陈皮、佛手', '多参加社交活动，保持开朗', '培养兴趣爱好，丰富生活', '适度运动，如散步、瑜伽', '学会情绪管理，释放压力'],
    '特禀质': ['避免已知过敏原', '清淡饮食，均衡营养', '保持室内清洁，空气流通', '适度锻炼，增强体质', '随身携带抗过敏药物']
  };
  return recommendations[mainType] || recommendations['平和质'];
}
export default function AIQuestion({
  props
}) {
  const {
    toast
  } = useToast();
  const [step, setStep] = useState('intro'); // intro | question | result
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const handleStart = () => {
    setStep('question');
  };
  const handleSelectAnswer = value => {
    const questionId = QUESTIONS[currentIndex].id.toString();
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };
  const handleNext = () => {
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };
  const handleSubmit = () => {
    // 计算结果
    const scores = calculateScores(answers);
    const mainType = getMainConstitution(scores);
    const recommendations = getRecommendations(mainType);
    setResult({
      mainType,
      scores,
      recommendations
    });
    setStep('result');
  };
  const handleSaveArchive = () => {
    toast({
      title: '保存成功',
      description: '您的体质报告已保存至健康档案',
      duration: 3000
    });
  };
  const handleGetPlan = () => {
    toast({
      title: '方案生成中',
      description: '正在为您定制30天食疗方案...',
      duration: 3000
    });

    // 跳转到方案页面
    if (props?.$w?.utils?.navigateTo) {
      props.$w.utils.navigateTo({
        pageId: 'diet-plan',
        params: {
          constitution: result.mainType
        }
      });
    }
  };
  const currentQuestion = QUESTIONS[currentIndex];
  const currentAnswer = answers[currentQuestion?.id?.toString()] ?? null;
  return <div className="min-h-screen bg-[#FAF6F0]">
      {step === 'intro' && <TestIntro onStart={handleStart} />}

      {step === 'question' && <>
          <TestProgress current={currentIndex + 1} total={QUESTIONS.length} />
          <TestQuestion question={currentQuestion} currentIndex={currentIndex} totalQuestions={QUESTIONS.length} selectedAnswer={currentAnswer} onSelect={handleSelectAnswer} onPrev={handlePrev} onNext={handleNext} onSubmit={handleSubmit} />
        </>}

      {step === 'result' && result && <TestResult result={result} onSaveArchive={handleSaveArchive} onGetPlan={handleGetPlan} />}
    </div>;
}