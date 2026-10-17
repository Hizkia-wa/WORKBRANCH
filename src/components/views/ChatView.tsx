'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Hash,
  Send,
  Smile,
  Paperclip,
  Users,
  Circle,
  Sparkles,
  MessageSquare,
} from 'lucide-react';
import Image from 'next/image';

export default function ChatView() {
  const {
    channels,
    currentChannelId,
    setCurrentChannelId,
    messages,
    sendMessage,
    addReaction,
    members,
    currentTeam,
  } = useApp();

  const [inputContent, setInputContent] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeChannel = channels.find((c) => c.id === currentChannelId) || channels[0];
  const channelMessages = messages.filter((m) => m.channelId === activeChannel.id);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [channelMessages.length]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputContent.trim()) return;
    sendMessage(activeChannel.id, inputContent);
    setInputContent('');
  };

  const quickEmojis = ['🚀', '🔥', '👍', '🎉', '⚡', '❤️'];

  return (
    <div
      className="materio-card"
      style={{
        padding: '0',
        height: 'calc(100vh - 160px)',
        minHeight: '600px',
        display: 'flex',
        overflow: 'hidden',
      }}
    >
      {/* KIRI: Saluran Obrolan (Channels) */}
      <div
        style={{
          width: '240px',
          background: 'var(--bg-input)',
          borderRight: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
        }}
      >
        {/* Header Saluran */}
        <div
          style={{
            padding: '18px 16px',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-heading)' }}>
            SALURAN TIM
          </div>
          <span className="badge badge-purple" style={{ fontSize: '0.65rem' }}>
            {channels.length} Saluran
          </span>
        </div>

        {/* Daftar Saluran */}
        <div style={{ padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: '4px', flex: 1, overflowY: 'auto' }}>
          {channels.map((ch) => {
            const isActive = ch.id === activeChannel.id;

            return (
              <button
                key={ch.id}
                onClick={() => setCurrentChannelId(ch.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left',
                  background: isActive ? 'var(--primary-light)' : 'transparent',
                  color: isActive ? 'var(--primary)' : 'var(--text-main)',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.85rem',
                  transition: 'all 0.15s',
                }}
              >
                <Hash size={16} color={isActive ? 'var(--primary)' : 'var(--text-muted)'} />
                <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {ch.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Footer TeamSync */}
        <div
          style={{
            padding: '14px',
            borderTop: '1px solid var(--border-color)',
            fontSize: '0.72rem',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)' }} />
          <span>Jaringan Pesan TeamSync Aktif</span>
        </div>
      </div>

      {/* TENGAH: Alur Percakapan & Input Pesan */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top Bar Saluran */}
        <div
          style={{
            height: '60px',
            padding: '0 20px',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--bg-card)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Hash size={20} color="var(--primary)" />
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-heading)' }}>
              {activeChannel.name}
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '8px' }}>
              &bull; {activeChannel.topic}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            <Users size={16} />
            <span>{currentTeam.members.length} anggota</span>
          </div>
        </div>

        {/* Daftar Pesan Obrolan */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {channelMessages.map((msg) => (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-start',
              }}
            >
              <Image
                src={msg.sender.avatar}
                alt={msg.sender.name}
                width={38}
                height={38}
                unoptimized
                style={{ borderRadius: '50%', objectFit: 'cover' }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-heading)' }}>
                    {msg.sender.name}
                  </span>
                  <span
                    className="badge badge-purple"
                    style={{ fontSize: '0.65rem', padding: '1px 6px' }}
                  >
                    {msg.sender.role}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-light)' }}>
                    {msg.timestamp}
                  </span>
                </div>

                <div
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-main)',
                    marginTop: '4px',
                    lineHeight: 1.5,
                  }}
                >
                  {msg.content}
                </div>

                {/* Reaction Chips */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px', flexWrap: 'wrap' }}>
                  {msg.reactions &&
                    msg.reactions.map((r, i) => (
                      <button
                        key={i}
                        onClick={() => addReaction(msg.id, r.emoji)}
                        style={{
                          background: 'var(--bg-input)',
                          border: '1px solid var(--border-color)',
                          borderRadius: '12px',
                          padding: '2px 8px',
                          fontSize: '0.75rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <span>{r.emoji}</span>
                        <span style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{r.count}</span>
                      </button>
                    ))}

                  {/* Quick Reaction Triggers */}
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {quickEmojis.slice(0, 3).map((em) => (
                      <button
                        key={em}
                        onClick={() => addReaction(msg.id, em)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '0.8rem',
                          opacity: 0.6,
                        }}
                        title={`Beri reaksi ${em}`}
                      >
                        {em}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Pesan */}
        <form
          onSubmit={handleSend}
          style={{
            padding: '14px 20px',
            borderTop: '1px solid var(--border-color)',
            background: 'var(--bg-card)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'var(--bg-input)',
              borderRadius: '10px',
              padding: '6px 14px',
              border: '1px solid var(--border-color)',
            }}
          >
            <input
              type="text"
              placeholder={`Kirim pesan ke #${activeChannel.name}...`}
              value={inputContent}
              onChange={(e) => setInputContent(e.target.value)}
              style={{
                flex: 1,
                border: 'none',
                background: 'transparent',
                outline: 'none',
                fontSize: '0.875rem',
                color: 'var(--text-main)',
                padding: '6px 0',
              }}
            />

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button
                type="submit"
                disabled={!inputContent.trim()}
                className="btn btn-primary btn-sm"
                style={{
                  borderRadius: '6px',
                  padding: '6px 14px',
                  opacity: inputContent.trim() ? 1 : 0.5,
                }}
              >
                <Send size={14} />
                <span>Kirim</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* KANAN: Status Anggota Tim */}
      <div
        style={{
          width: '210px',
          background: 'var(--bg-input)',
          borderLeft: '1px solid var(--border-color)',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          overflowY: 'auto',
          flexShrink: 0,
        }}
      >
        <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
          Anggota Tim ({members.length})
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {members.map((member) => (
            <div key={member.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ position: 'relative' }}>
                <Image
                  src={member.avatar}
                  alt={member.name}
                  width={28}
                  height={28}
                  unoptimized
                  style={{ borderRadius: '50%', objectFit: 'cover' }}
                />
                <span
                  style={{
                    position: 'absolute',
                    bottom: '0',
                    right: '0',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background:
                      member.status === 'online'
                        ? 'var(--success)'
                        : member.status === 'idle'
                        ? 'var(--warning)'
                        : 'var(--text-light)',
                    border: '1.5px solid var(--bg-card)',
                  }}
                />
              </div>
              <div style={{ overflow: 'hidden' }}>
                <div
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: 'var(--text-heading)',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                  }}
                >
                  {member.name}
                </div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                  {member.role.split(' ')[0]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
